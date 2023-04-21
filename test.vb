' input.csvからファイル名と項目名・セル位置を読み取って、
' テンプレートエクセルを書き換えて出力する
Sub GenerateExcelFiles()
    
    ' input.csvのパスを取得する
    Dim inputFilePath As String
    inputFilePath = ThisWorkbook.Path & "\input.csv"
    
    ' input.csvを開く
    Dim inputFile As Workbook
    Set inputFile = Workbooks.Open(inputFilePath)
    
    ' input.csvからデータを読み込む
    Dim inputData As Worksheet
    Set inputData = inputFile.Worksheets(1)
    
    ' 出力先フォルダを作成する
    Dim outputFolderPath As String
    outputFolderPath = ThisWorkbook.Path & "\output"
    If Dir(outputFolderPath, vbDirectory) = "" Then
        MkDir outputFolderPath
    End If
    
    ' input.csvからファイル名と項目名・セル位置を読み取って、
    ' テンプレートエクセルを書き換えて出力する
    Dim lastRow As Long
    lastRow = inputData.Cells(Rows.Count, 1).End(xlUp).Row
    
    Dim i As Long
    For i = 2 To lastRow ' 1行目はヘッダー
        
        ' ファイル名を取得する
        Dim fileName As String
        fileName = inputData.Cells(i, 1).Value
        
        ' 出力先ファイルのパスを作成する
        Dim outputFilePath As String
        outputFilePath = outputFolderPath & "\" & fileName
        
        ' テンプレートエクセルをコピーする
        FileCopy ThisWorkbook.Path & "\template.xlsx", outputFilePath
        
        ' コピーしたファイルを開く
        Dim outputWorkbook As Workbook
        Set outputWorkbook = Workbooks.Open(outputFilePath)
        
        ' データを書き込む
        Dim values() As Variant
        values = inputData.Range(inputData.Cells(i, 2), inputData.Cells(i, inputData.Columns.Count)).Value
        
        Dim j As Long
        For j = 1 To UBound(values, 2)
            Dim itemName As String
            itemName = values(1, j)
            
            Dim cellAddress As String
            cellAddress = values(2, j)
            
            Dim cellValue As String
            cellValue = values(3, j)
            
            outputWorkbook.Worksheets(1).Range(cellAddress).Value = cellValue
        Next j
        
        ' ファイルを保存して閉じる
        outputWorkbook.Save
        outputWorkbook.Close
        
    Next i
    
    ' input.csvを閉じる
    inputFile.Close
    
    ' 終了メッセージを表示する
    MsgBox "Excelファイルの生成が完了しました。"
    
End Sub
