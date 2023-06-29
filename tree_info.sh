#!/bin/bash

# フォルダのパスを引数として取得
folder_path=$1

# treeコマンドでフォルダの内容を表示し、情報を付与してファイルに出力
tree -a "$folder_path" | awk 'BEGIN {OFS="\t"} {print $0, $3, $4, $2}' > output.txt
