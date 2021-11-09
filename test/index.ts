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

// const t1 = {
//   name: "sketch-header-children-1-1",
//   rectAttr: { x: 0, y: 0, width: 3751, height: 952 },
//   children: [],
// };

// debugger;
// const r2 = breadthFirstSearch(t1 as sketchTreeType, codeTree as nodeTreeType);
// console.log("🚀 ~ file: index.ts ~ line 37 ~ r2", r2);
