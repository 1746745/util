const fs = require('fs');

// ファイルから変数名と項目名を読み込む関数
function readVariableNamesAndFieldNamesFromFile(filename) {
  const fileContents = fs.readFileSync(filename, 'utf8');
  const lines = fileContents.split('\n');
  const variableNamesAndFieldNames = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') {
      continue; // 空行は無視する
    }

    var [variableName, fieldName, type] = line.split(",");
    variableName = variableName.trim()
    fieldName = fieldName.trim()
    type = type.trim()
    
    variableNamesAndFieldNames.push({variableName, fieldName, type});
}

  return variableNamesAndFieldNames;
}

// Javadocを生成する関数
function generateJavadoc(variableName, fieldName, isSetter) {
  const prefix = isSetter ? 'set' : 'get';
  const capitalizedFieldName = variableName.charAt(0).toUpperCase() + variableName.slice(1);
  const methodName = prefix + capitalizedFieldName;
  const javadoc = `/**
  * ${isSetter ? fieldName+'を設定する' : fieldName+'を取得する'}
  *
  * ${isSetter ? '@param '+variableName : '@return '+variableName} ${fieldName}
  */`;
  return { methodName, javadoc };
}

// setter関数を生成する関数
function generateSetterFunction(variableName, fieldName, type) {
  const methodNameAndJavadoc = generateJavadoc(variableName, fieldName, true);
  const functionBody = `
  ${methodNameAndJavadoc.javadoc}
  public void ${methodNameAndJavadoc.methodName}(${type} ${variableName}) {
    this.${variableName} = ${variableName};
  }
  `;
  return functionBody;
}

// getter関数を生成する関数
function generateGetterFunction(variableName, fieldName, type) {
  const methodNameAndJavadoc = generateJavadoc(variableName, fieldName, false);
  const functionBody = `
  ${methodNameAndJavadoc.javadoc}
  public ${type} ${methodNameAndJavadoc.methodName}() {
    return this.${variableName};
  }
  `;
  return functionBody;
}

// メイン処理
const variableNamesAndFieldNames = readVariableNamesAndFieldNamesFromFile('/frontend/src/input.csv');
let output = '';

for (let i = 0; i < variableNamesAndFieldNames.length; i++) {
  const { variableName, fieldName, type } = variableNamesAndFieldNames[i];
  console.log(variableName, fieldName, type)
//   output += generateJavadoc(variableName, fieldName, true).javadoc + '\n';
  output += generateSetterFunction(variableName, fieldName, type) + '\n';
//   output += generateJavadoc(variableName, fieldName, false).javadoc + '\n';
  output += generateGetterFunction(variableName, fieldName, type) + '\n';
}

console.log(output)
