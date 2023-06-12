import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MarkdownTableExample {

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

        // キー割れでセル結合
        List<List<String>> mergedData = mergeCellsByKey(data);

        // Markdown形式のテーブルの生成
        StringBuilder markdownTable = new StringBuilder();
        for (List<String> rowData : mergedData) {
            markdownTable.append("|");
            for (String cellData : rowData) {
                markdownTable.append(" ").append(cellData).append(" |");
            }
            markdownTable.append("\n");
            if (rowData == mergedData.get(0)) {
                markdownTable.append("|");
                for (int i = 0; i < rowData.size(); i++) {
                    markdownTable.append(" --- |");
                }
                markdownTable.append("\n");
            }
        }

        // Markdown形式のテーブルの表示
        System.out.println(markdownTable.toString());
    }

    private static List<List<String>> mergeCellsByKey(List<List<String>> data) {
        List<List<String>> mergedData = new ArrayList<>();

        String[] previousKey = null;
        List<String> mergedRow = null;

        for (List<String> row : data) {
            String[] currentKey = new String[] { row.get(0), row.get(1) };

            if (previousKey != null && !Arrays.equals(currentKey, previousKey)) {
                mergedData.add(mergedRow);
                mergedRow = null;
            }

            if (mergedRow == null) {
                mergedRow = new ArrayList<>(row);
            } else {
                for (int i = 2; i < row.size(); i++) {
                    mergedRow.add(row.get(i));
                }
            }

            previousKey = currentKey;
        }

        if (mergedRow != null) {
            mergedData.add(mergedRow);
        }

        return mergedData;
    }
}
