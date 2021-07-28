import fs = require("fs");
import yaml = require("js-yaml");
import { DataYamlName, DoNotEditMessage } from "./constants";
import { DataYamlType } from "./data-class";

/**
 * ファイルを読み込む
 * @param fileName ファイル名
 */
export const readFile = (fileName: string): string =>
  fs.readFileSync(fileName, "utf8");

/**
 * ファイルを書き込む
 * @param fileName ファイル名
 * @param content 内容
 */
export const writeFile = (fileName: string, content: string): void => {
  fs.writeFile(fileName, content, "utf8", (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};

/**
 * 自動生成されたファイルを書き込む
 * @param fileName ファイル名
 * @param content 内容
 */
export const writeAutoGenerateFile = (
  fileName: string,
  content: string
): void => {
  writeFile(fileName, DoNotEditMessage + content);
};

/**
 * data.yaml を読み込む
 */
export const readDataYamlFile = (): DataYamlType =>
  yaml.load(readFile(DataYamlName));

/**
 * data.yaml を変更する
 * @param data 書き込むデータ
 */
export const writeDataYamlFile = (data: DataYamlType): void => {
  writeFile(
    DataYamlName,
    yaml.dump(data, {
      lineWidth: 200,
    })
  );
};
