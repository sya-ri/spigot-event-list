import fs from "fs";

/**
 * ファイルから文字列を読み取る
 */
export const readFile = (fileName: string): string => {
  return fs.readFileSync(fileName, "utf8");
};

/**
 * ファイルに文字列を書き込む
 */
export const writeFile = (fileName: string, content: string) => {
  fs.writeFile(fileName, content, "utf8", (e) => {
    if (e) {
      console.error(e.message);
    }
  });
};

/**
 * ディレクトリを削除する
 */
export const deleteDirectory = (fileName: string) => {
  fs.rmSync(fileName, { force: true, recursive: true });
};

/**
 * ディレクトリを作成する
 */
export const createDirectory = (fileName: string) => {
  fs.mkdirSync(fileName);
};
