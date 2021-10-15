import sketchTree from "../src/parsedOutput/sketchTree.json";
import codeTree from "../src/parsedOutput/codeTree.json";
import { handleRecursiveFindChildren } from "../src/searcher/findTree";
import { treeShapeType as sketchTreeType } from "../src/parser/parseSketchTree";
import { treeShapeType as nodeTreeType } from "../src/parser/parseCodeTree";

debugger;
const res = handleRecursiveFindChildren(
  [sketchTree as sketchTreeType],
  [codeTree as nodeTreeType],
  0
);
console.log("🚀 ~ file: index.ts ~ line 12 ~ res", res);
