const fs = require("fs");
const clipboard = require("electron").clipboard;
const generateTreeAndCollectPaths = require("./generateTreeAndCollectPaths");
const isBinaryFile = require("./isBinaryFile");

async function generateTree(dir, options) {
  const { entries, output: treeOutput } = await generateTreeAndCollectPaths(
    dir,
    options,
  );
  let output = treeOutput;

  // 파일 내용 포함 여부에 따른 처리...
  if (options.showContent) {
    for (const entry of entries) {
      if (!entry.isDirectory) {
        if (await isBinaryFile(entry.path)) {
          continue;
        }

        try {
          const content = await fs.promises.readFile(entry.path, "utf8");
          if (!content.trim()) {
            continue;
          }

          output += "\n";
          output += `${entry.parentPaths.join(" > ")}\n\`\`\`\n${content}\n\`\`\`\n`;
        } catch (error) {
          console.error(
            `파일을 읽는 중 오류 발생: ${entry.path}, ${error.message}`,
          );
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
      console.log("결과가 클립보드에 복사되었습니다.");
    } catch (error) {
      console.error(`클립보드 복사 중 오류 발생: ${error.message}`);
    }
  }

  return output;
}

module.exports = generateTree;
