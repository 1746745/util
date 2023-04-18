function convertToJavaString(str) {
    const lines = str.split('\n');
    const quotedLines = lines.map(line => `"${line}"`);
    return quotedLines.join(' + ');
}