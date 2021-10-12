import sketchJson from "../raw-sketch-file/test-unit1.json";

import { preProcessSketchTree } from "../parser/parseSketchTree";

export const sketchJsonNodeTree =
  sketchJson["pages"]["7E522EA9-B322-45DC-BC16-6DE9174CFB93"];

export const sketchParsedTree = preProcessSketchTree(sketchJsonNodeTree, 0);

console.log("sketchParsedTree", sketchParsedTree);
