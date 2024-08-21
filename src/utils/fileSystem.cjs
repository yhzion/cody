const { clipboard } = require('electron');
const fs = require('fs');
const path = require('path');

// matchesPattern 함수 정의
function matchesPattern(filePath, includePattern, excludePattern) {
  if (excludePattern && new RegExp(excludePattern).test(filePath)) {
    return false;
  }
  if (includePattern && !new RegExp(includePattern).test(filePath)) {
    return false;
  }
  return true;
}

// isBinaryFile 함수 정의
async function isBinaryFile(filePath) {
  try {
    const buffer = await fs.promises.readFile(filePath, { encoding: null });
    const text = buffer.toString('utf8');
    return text.includes('\u0000');
  } catch (error) {
    console.error(`파일을 검사하는 중 오류 발생: ${filePath}, ${error.message}`);
    return false;
  }
}

// generateTreeAndCollectPaths 함수 정의
async function generateTreeAndCollectPaths(dir, options, prefix = '', parentPaths = [], isLast = true) {
  const entries = [];
  let output = '';

  const items = await fs.promises.readdir(dir, { withFileTypes: true });

  // .asar 파일이나 node_modules 디렉토리를 건너뛰기
  const filteredItems = items.filter(item => !item.name.endsWith('.asar') && !item.name.includes('node_modules'));

  const sortedItems = filteredItems.sort((a, b) => (a.isDirectory() ? -1 : 1)); // 디렉토리를 먼저 출력
  const totalItems = sortedItems.length;

  for (const [index, entry] of sortedItems.entries()) {
    const fullPath = path.join(dir, entry.name);
    const isDirectory = entry.isDirectory();
    const displayName = isDirectory
      ? `📁 ${entry.name}`
      : `📄 ${entry.name}`;

    const isLastItem = index === totalItems - 1;
    const connector = isLastItem ? '└── ' : '├── ';
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    const fullDisplayPath = `${prefix}${connector}${displayName}`;

    if (!matchesPattern(fullPath, options.includePattern, options.excludePattern)) {
      continue;
    }

    const currentEntry = {
      path: fullPath,
      isDirectory,
      displayName,
      fullDisplayPath,
      parentPaths: [...parentPaths, displayName],
    };
    entries.push(currentEntry);
    output += `${fullDisplayPath}\n`;

    if (isDirectory) {
      const { entries: subEntries, output: subOutput } =
        await generateTreeAndCollectPaths(fullPath, options, newPrefix, currentEntry.parentPaths, isLastItem);
      entries.push(...subEntries);
      output += subOutput;
    }
  }

  return { entries, output };
}

// generateTree 함수 정의
async function generateTree(dir, options) {
  const { entries, output: treeOutput } = await generateTreeAndCollectPaths(dir, options);
  let output = treeOutput;

  // 파일 내용 포함 여부에 따른 처리...
  if (options.showContent) {
    for (const entry of entries) {
      if (!entry.isDirectory) {
        if (await isBinaryFile(entry.path)) {
          continue;
        }

        try {
          const content = await fs.promises.readFile(entry.path, 'utf8');
          if (!content.trim()) {
            continue;
          }

          output += '\n';
          output += `${entry.parentPaths.join(' > ')}\n\`\`\`\n${content}\n\`\`\`\n`;
        } catch (error) {
          console.error(`파일을 읽는 중 오류 발생: ${entry.path}, ${error.message}`);
        }
      }
    }
  }

  if (options.outputFile) {
    try {
      await fs.promises.writeFile(options.outputFile, output);
      console.log(`결과가 ${options.outputFile}에 저장되었습니다.`);
    } catch (error) {
      console.error(`파일 저장 중 오류 발생: ${error.message}`);
    }
  }

  if (options.saveClipboard) {
    try {
      clipboard.writeText(output);
      console.log('결과가 클립보드에 복사되었습니다.');
    } catch (error) {
      console.error(`클립보드 복사 중 오류 발생: ${error.message}`);
    }
  }

  return output;
}

module.exports = { generateTree };