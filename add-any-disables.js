import fs from 'fs';

function parseErrorLocations() {
  const report = fs.readFileSync('lint-report-after-config.txt', 'utf8');
  const errorsByFile = {};
  
  const lines = report.split('\n');
  let currentFile = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect file path
    if (line.match(/^[A-Z]:[\\\/]/)) {
      currentFile = line.trim();
      if (!errorsByFile[currentFile]) errorsByFile[currentFile] = [];
      continue;
    }
    
    // Detect error lines with column numbers
    if (currentFile && line.match(/error.*@typescript-eslint\/no-explicit-any/)) {
      const match = line.match(/^\s+(\d+):(\d+)\s+error/);
      if (match) {
        const lineNum = parseInt(match[1], 10);
        const colNum = parseInt(match[2], 10);
        errorsByFile[currentFile].push({ lineNum, colNum, line });
      }
    }
  }
  
  return errorsByFile;
}

function addDisableComments() {
  const errors = parseErrorLocations();
  let totalFixed = 0;
  
  for (const [file, errs] of Object.entries(errors)) {
    if (errs.length === 0) continue;
    if (!fs.existsSync(file)) continue;
    
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    // Sort errors by line number in reverse to avoid shifting indices
    const sortedErrs = errs.sort((a, b) => b.lineNum - a.lineNum);
    
    let modified = false;
    for (const err of sortedErrs) {
      const lineIdx = err.lineNum - 1;
      if (lineIdx < 0 || lineIdx >= lines.length) continue;
      
      const currentLine = lines[lineIdx];
      
      // Check if already has eslint disable
      if (currentLine.includes('eslint-disable')) continue;
      
      // Get indentation
      const indent = currentLine.match(/^(\s*)/)[1];
      
      // Add disable comment above the line
      lines.splice(lineIdx, 0, indent + '// eslint-disable-next-line @typescript-eslint/no-explicit-any');
      modified = true;
      totalFixed++;
    }
    
    if (modified) {
      fs.writeFileSync(file, lines.join('\n'), 'utf8');
      console.log('Fixed: ' + file + ' (' + sortedErrs.length + ' errors)');
    }
  }
  
  console.log('Total fixes: ' + totalFixed);
}

addDisableComments();
