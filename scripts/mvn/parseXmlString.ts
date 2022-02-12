import { parseString } from "xml2js";

export default function parseXmlString(body: string) {
  return new Promise((resolve, reject) => {
    parseString(body, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
