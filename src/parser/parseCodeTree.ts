/**
 * parse code nodeTree by pupetteer into jsonTree
 */

import type { ElementHandle } from "puppeteer";

/** node节点树的形状 */
interface treeShapeType {
  name: string | undefined;
  rectAttr: object | null | undefined;
  puppetChildren: Array<ElementHandle> | null | undefined;
  children: treeShapeType[];
}

export async function preProcessPuppeTree(
  puppeNode: ElementHandle | null,
  initStat?: number
) {
  const treeShape: treeShapeType = {
    name: "",
    rectAttr: {},
    puppetChildren: [],
    children: [],
  };

  let $parent = initStat === 0 ? await puppeNode?.$("#app") : puppeNode;

  treeShape.name = $parent?._remoteObject.description;
  treeShape.rectAttr = await $parent?.boundingBox();
  treeShape.puppetChildren = await $parent?.$$(":scope > *");

  if (!treeShape.puppetChildren) return treeShape; // 1) pupetteer如果没找到children，递归结束

  for (const child of treeShape.puppetChildren) {
    const childNode = await preProcessPuppeTree(child);
    childNode && treeShape.children.push(childNode);
  }

  return treeShape; //  2) 最终结果出口
}
