Sub ReadFilesInFolder()
    Dim folderPath As String
    Dim fileName As String
    Dim filePath As String
    Dim fileContent As String
    Dim dataArray() As String
    Dim rowNum As Integer
    Dim colNum As Integer

    ' フォルダのパスを指定します
    folderPath = "C:\Users\test\"

    ' ワークシートを取得します（適切なワークシート名に置き換えてください）
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Sheet1")

    ' 行番号を初期化します
    rowNum = 1

    ' 指定したフォルダ内のすべてのファイルに対して処理を行います
    fileName = Dir(folderPath & "*")

    Do While fileName <> ""
        ' ファイルのパスを作成します
        filePath = folderPath & fileName

        ' ファイルをテキストとして読み込みます（UTF-8エンコーディング）
        With CreateObject("ADODB.Stream")
            .Type = 2 ' テキストモード
            .Charset = "UTF-8"
            .Open
            .LoadFromFile filePath
            fileContent = .ReadText
            .Close
        End With

        ' データを行ごとに分割します
        dataArray = Split(Trim(fileContent), vbLf)

        ' セルにデータを書き込みます
        For Each Line In dataArray
            Dim lineDataArray() As String
            lineDataArray = Split(Trim(Line), " ")

            colNum = 1 ' 列番号を初期化します
            For Each Item In lineDataArray
                ws.Cells(rowNum, colNum).Value = Item
                colNum = colNum + 1 ' 次の列に移動します
            Next Item

            rowNum = rowNum + 1 ' 次の行に移動します
        Next Line

        ' 次のファイルを取得します
        fileName = Dir()
    Loop

    ' セルの高さを自動調整します
    ws.Rows.AutoFit

    ' メッセージを表示します
    MsgBox "処理が完了しました。"
End Sub

