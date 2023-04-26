function convertMarkdownToRedmine(text) {
  const regexPatterns = {
    '^# (.*)': '= $1 =', // 見出し1
    '^## (.*)': '== $1 ==', // 見出し2
    '^### (.*)': '=== $1 ===', // 見出し3
    '^#### (.*)': '==== $1 ====', // 見出し4
    '^##### (.*)': '===== $1 =====', // 見出し5
    '^###### (.*)': '====== $1 ======', // 見出し6
    '^(\\*|\\-|\\+) (.*)': '- $2', // 箇条書き
    '^\\d+\\. (.*)': '# $1', // 番号付き箇条書き
    '^> (.*)': '> $1', // 引用
    '```(.+?)```': '{{{\n$1\n}}}', // コードブロック
    '\\*\\*(.+?)\\*\\*': '*$1*', // 太字
    '_(.+?)_': '_$1_', // 下線
    '~~(.+?)~~': '-$1-', // 打ち消し線
    '`(.+?)`': '{{{$1}}}', // コード
    '\\[(.+?)\\]\\((.+?)\\)': '"$1":$2', // リンク
    '^---$': '----', // 水平線
    '^\\|(.+)\\|$': '|$1|', // テーブル
    '^:?(\\-+\\|)+\\-+:?$': '', // テーブルの境界線
    '\\n(\\|.+)+\\|\\n(\\|\\s*\\:?\\-+\\:?\\s*)+\\|\\n((\\|.+)+\\|\\n)*': (match) => {
      // テーブルの中身を整形
      const lines = match.trim().split('\n');
      const cellCounts = lines[0].match(/\|/g).length;
      const separator = `|${lines[1].replace(/[^|]/g, '-')}|`;
      const tableRows = lines.slice(2, -1).map((row) => {
        const cells = row.split('|').slice(1, -1).map((cell) => cell.trim());
        if (cells.length < cellCounts) {
          cells.push(...Array(cellCounts - cells.length).fill(''));
        }
        return `| ${cells.join(' | ')} |`;
      }).join('\n');
      return `${separator}\n${tableRows}\n${separator}`;
    },
    '![^\\]]+\\]\\(([^\\)]+)\\)': '!\{$1\}', // 画像
  };

  for (const regexPattern in regexPatterns) {
    const convertFn = regexPatterns[regexPattern];
    const regex = new RegExp(regexPattern, 'gm');
    text = text.replace(regex, (match, ...groups) => {
      if (typeof convertFn === 'function') {
        return convertFn(match, ...groups);
      }
      return match.replace(new RegExp(regexPattern, 'g'), convert
