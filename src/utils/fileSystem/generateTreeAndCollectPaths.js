const fs = require("fs");
const path = require("path");
const matchesPattern = require("./matchesPattern");
const isBinaryFile = require("./isBinaryFile");

async function generateTreeAndCollectPaths(
  dir,
  options,
  prefix = "",
  parentPaths = [],
  isLast = true,
) {
  const entries = [];
  let output = "";

  const items = await fs.promises.readdir(dir, { withFileTypes: true });

  // .asar 파일이나 node_modules 디렉토리를 건너뛰기
  const filteredItems = items.filter(
    (item) =>
      !item.name.endsWith(".asar") && !item.name.includes("node_modules"),
  );

  const sortedItems = filteredItems.sort((a, b) => (a.isDirectory() ? -1 : 1)); // 디렉토리를 먼저 출력
  const totalItems = sortedItems.length;

  for (const [index, entry] of sortedItems.entries()) {
    const fullPath = path.join(dir, entry.name);
    const isDirectory = entry.isDirectory();
    const displayName = isDirectory ? `📁 ${entry.name}` : `📄 ${entry.name}`;

    const isLastItem = index === totalItems - 1;
    const connector = isLastItem ? "└── " : "├── ";
    const newPrefix = prefix + (isLast ? "    " : "│   ");
    const fullDisplayPath = `${prefix}${connector}${displayName}`;

    if (
      !matchesPattern(fullPath, options.includePattern, options.excludePattern)
    ) {
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
        await generateTreeAndCollectPaths(
          fullPath,
          options,
          newPrefix,
          currentEntry.parentPaths,
          isLastItem,
        );
      entries.push(...subEntries);
      output += subOutput;
    }
  }

  return { entries, output };
}

module.exports = generateTreeAndCollectPaths;
