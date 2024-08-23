const fs = require("fs");

async function isBinaryFile(filePath) {
  try {
    const buffer = await fs.promises.readFile(filePath, { encoding: null });
    const text = buffer.toString("utf8");
    return text.includes("\u0000");
  } catch (error) {
    console.error(
      `Error occurred while checking the file: ${filePath}, ${error.message}`,
    );
    return false;
  }
}

module.exports = isBinaryFile;
