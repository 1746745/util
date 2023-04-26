const fs = require('fs');
const path = require('path');

function searchFiles(dir, searchText, searchInFileContents = true) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      searchFiles(filePath, searchText, searchInFileContents);
    } else {
      if (searchInFileContents) {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        if (fileContents.includes(searchText)) {
          console.log(filePath);
        }
      } else {
        if (file.includes(searchText)) {
          console.log(filePath);
        }
      }
    }
  }
}

// 使用例1：カレントディレクトリ以下のファイルから「example」をファイル名で検索する
searchFiles('.', 'example', false);

// 使用例2：カレントディレクトリ以下のファイルから「example」をコンテンツで検索する
searchFiles('.', 'example');
