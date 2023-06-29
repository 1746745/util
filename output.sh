#!/bin/bash

folder_path=$1

# フォルダ名を取得
folder_name=$(basename "$folder_path")

# フォルダ内のファイルを表示し、所有者・グループ・パーミッションを表示
find "$folder_path" -maxdepth 1 -exec stat -c "%n %U %G %a %F" {} \; | awk '{print $1, $2, $3, $4, $NF}' > "$folder_name"_output.txt
