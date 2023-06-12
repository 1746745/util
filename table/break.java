import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class ExcelGroupingExample {

    public static void main(String[] args) {
        // テストデータの作成
        List<List<String>> data = Arrays.asList(
                Arrays.asList("1", "A", "X"),
                Arrays.asList("1", "A", "Y"),
                Arrays.asList("2", "B", "X"),
                Arrays.asList("2", "B", "Y"),
                Arrays.asList("2", "B", "Z"),
                Arrays.asList("3", "C", "X")
        );

        // Excelファイルを作成
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Table");

        // データをExcelに書き込む
        int rowIndex = 0;
        for (List<String> rowData : data) {
            Row row = sheet.createRow(rowIndex++);
            int cellIndex = 0;
            for (String cellData : rowData) {
                Cell cell = row.createCell(cellIndex++);
                cell.setCellValue(cellData);
            }
        }

        // キー割れでセル結合
        int[] keyIndexes = {0, 1}; // キーとなる要素のインデックス
        int startRow = 1;
        int endRow = 1;
        String[] previousKey = getRowKey(data.get(1), keyIndexes);
        for (int row = 2; row < data.size(); row++) {
            String[] currentKey = getRowKey(data.get(row), keyIndexes);
            if (!Arrays.equals(currentKey, previousKey)) {
                if (startRow != endRow) {
                    mergeCells(sheet, startRow, endRow, keyIndexes.length);
                }
                startRow = row;
            }
            endRow = row;
            previousKey = currentKey;
        }
        if (startRow != endRow) {
            mergeCells(sheet, startRow, endRow, keyIndexes.length);
        }

        // セルのスタイルを設定
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        for (Row row : sheet) {
            for (Cell cell : row) {
                cell.setCellStyle(cellStyle);
            }
        }

        // Excelファイルを保存
        try (FileOutputStream fileOut = new FileOutputStream("table.xlsx")) {
            workbook.write(fileOut);
            System.out.println("Excelファイルが正常に作成されました。");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String[] getRowKey(List<String> rowData, int[] keyIndexes) {
        String[] key = new String[keyIndexes.length];
        for (int i = 0; i < keyIndexes.length; i++) {
            key[i] = rowData.get(keyIndexes[i]);
        }
        return key;
    }

    private static void mergeCells(Sheet sheet, int startRow, int endRow, int mergeColumnCount) {
        for (int col = 0; col < mergeColumnCount; col++) {
            sheet.addMergedRegion(new CellRangeAddress(startRow, endRow, col, col));
        }
    }
}
