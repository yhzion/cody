const fs = require("fs");
const clipboard = require("electron").clipboard;
const generateTreeAndCollectPaths = require("./generateTreeAndCollectPaths.cjs");
const isBinaryFile = require("./isBinaryFile.cjs");

async function generateTree(dir, options) {
  const { entries, output: treeOutput } = await generateTreeAndCollectPaths(
    dir,
    options,
  );
  let output = treeOutput;

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
            `Error occurred while reading the file: ${entry.path}, ${error.message}`,
          );
        }
      }
    }
  }

  if (options.outputFile) {
    try {
      await fs.promises.writeFile(options.outputFile, output);
      console.log(`The result has been saved to ${options.outputFile}.`);
    } catch (error) {
      console.error(`Error occurred while saving the file: ${error.message}`);
    }
  }

  if (options.saveClipboard) {
    try {
      clipboard.writeText(output);
      console.log("The result has been copied to the clipboard.");
    } catch (error) {
      console.error(
        `Error occurred while copying to the clipboard: ${error.message}`,
      );
    }
  }

  return output;
}

module.exports = generateTree;
