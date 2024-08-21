let chalk;
let colors;

const loadColors = async () => {
  if (!chalk) {
    chalk = (await import('chalk')).default;
    colors = {
      reset: chalk.reset,
      bright: chalk.bold,
      dim: chalk.dim,
      underscore: chalk.underline,
      blink: chalk.italic, // Node.js에서 blink는 지원하지 않음. 대체로 italic 사용
      reverse: chalk.inverse,
      hidden: chalk.hidden,
      fg: {
        black: chalk.black,
        red: chalk.red,
        green: chalk.green,
        yellow: chalk.yellow,
        blue: chalk.blue,
        magenta: chalk.magenta,
        cyan: chalk.cyan,
        white: chalk.white,
      },
      bg: {
        black: chalk.bgBlack,
        red: chalk.bgRed,
        green: chalk.bgGreen,
        yellow: chalk.bgYellow,
        blue: chalk.bgBlue,
        magenta: chalk.bgMagenta,
        cyan: chalk.bgCyan,
        white: chalk.bgWhite,
      },
      directory: chalk.cyan.bold, // 디렉토리 스타일 추가
      file: chalk.white, // 파일 스타일 추가
    };
  }
  return colors;
};

module.exports = { loadColors };