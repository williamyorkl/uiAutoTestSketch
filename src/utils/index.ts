import fs from "fs";

export function writeFileJson(fileName: string, data: object) {
  fs.writeFileSync(`${fileName}.json`, JSON.stringify(data), { flag: "w" });
}

// interface dataObjType {
//   toDeleteProp:string
// }

export function recursivelyDeleteProps(dataObj: any, toDeleteProp: string) {
  const toDeleteItem = toDeleteProp;

  if (dataObj[toDeleteProp]) {
    delete dataObj[toDeleteProp];
  }

  if (dataObj.children) {
    for (const key in dataObj.children) {
      const cNode = dataObj.children[key];
      recursivelyDeleteProps(cNode, toDeleteItem);
    }
  }
}

// typeof的增强型类型判断
export function isSpecificType<T, P>(
  Itype: T | P,
  objArg: string,
  basicArgType: string | number | boolean
): Itype is T {
  return typeof Itype[objArg] === basicArgType;
}
