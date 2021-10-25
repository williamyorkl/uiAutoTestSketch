import sketchTree from "../src/parsedOutput/sketchTree.json";
import codeTree from "../src/parsedOutput/codeTree.json";
import {
  handleRecursiveFindChildren,
  breadthFirstSearch,
} from "../src/searcher/findTree";
import { treeShapeType as sketchTreeType } from "../src/parser/parseSketchTree";
import { treeShapeType as nodeTreeType } from "../src/parser/parseCodeTree";

// debugger;
const res = handleRecursiveFindChildren(
  [sketchTree as sketchTreeType],
  [codeTree as nodeTreeType],
  0,
  [codeTree as nodeTreeType]
);
console.log("🚀 ~ file: index.ts ~ line 12 ~ res", res);

/**
 * 1. 如果传入的codeNode没在sketchTree中找到
 * *   1） 该codeNode有可能是不存在
 *      - 如果不存在，则在全局的node中，懒匹配地找。（即找到就break）
 *        - 在其它的层级找到（非父亲层级下）
 *
 *        - 在其父亲下找到（只是父亲没匹配）
 *
 * *  2） 该codeNOde有可能存在，但是写错了
 */

// const t1 = {
//   name: "sketch-header-children-1-1",
//   rectAttr: { x: 0, y: 0, width: 3751, height: 952 },
//   children: [],
// };

// debugger;
// const r2 = breadthFirstSearch(t1 as sketchTreeType, codeTree as nodeTreeType);
// console.log("🚀 ~ file: index.ts ~ line 37 ~ r2", r2);
