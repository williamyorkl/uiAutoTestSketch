/**
 * parse sketch json Tree into a comparable json tree
 */
import { sketchJsonNodeTree } from "../formatHandler/handleSketchJson";

interface frameType {
  _class: string;
  constrainProportions: boolean;
  height: number;
  width: number;
  x: number;
  y: number;
}

interface styleType {
  _class: string;
  do_objectID: string;
  endMarkerType: number;
  miterLimit: number;
  startMarkerType: number;
  windingRule: number;
  blur: any;
  borderOptions: any;
}

/** sketch节点树的形状 */
interface sketchTreeType extends Partial<typeof sketchJsonNodeTree> {
  name: string;
  frame: any;
  style: any;
  layers: any;
}

/** node节点树的形状 */
export interface treeShapeType {
  name: string | undefined | null;
  rectAttr: typeof sketchJsonNodeTree["frame"] | null | undefined;
  sketchChildren: Array<sketchTreeType> | null | undefined;
  children: treeShapeType[] | null;
}

export function preProcessSketchTree(
  sketchNode: sketchTreeType
): treeShapeType | {} {
  const treeShape: treeShapeType | {} = {};

  let $parent = sketchNode;

  treeShape["name"] = $parent?.name;
  const { x, y, width, height } = $parent?.frame;
  treeShape["rectAttr"] = { x, y, width, height };
  treeShape["sketchChildren"] = $parent?.layers;
  treeShape["children"] = [];

  if (!treeShape["sketchChildren"]) return treeShape; // 1) pupetteer如果没找到children，递归结束

  for (const child of treeShape["sketchChildren"]) {
    const childNode = preProcessSketchTree(child);
    childNode && treeShape["children"].push(childNode);
  }

  return treeShape; //  2) 最终结果出口
}
