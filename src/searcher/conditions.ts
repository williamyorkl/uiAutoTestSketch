import { RectType } from "../../typings/basicTree";
import { defineBoundary } from "./utils";

/** 匹配 width、height */
export const widthHeight = function (
  sketchRectObj: RectType,
  nodeRectObj: RectType
) {
  const { width: sketchWidth, height: sketchHeight } = sketchRectObj;

  const { width: nodeWidth, height: nodeHeight } = nodeRectObj;

  return (
    defineBoundary(sketchWidth, nodeWidth) &&
    defineBoundary(sketchHeight, nodeHeight)
  );
};

/** 匹配x，y */
export const xY = function (sketchRectObj: RectType, nodeRectObj: RectType) {
  const { x: sketchX, y: sketchY } = sketchRectObj;
  const { x: nodeX, y: nodeY } = nodeRectObj;

  return defineBoundary(sketchX, nodeX) && defineBoundary(sketchY, nodeY);
};
