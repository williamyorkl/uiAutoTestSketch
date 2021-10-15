export declare interface NodeTree {
  name: string | undefined;
  rectAttr: RectType;
  children: TreeType | null;
}

export declare interface RectType {
  x: number;
  y: number;
  width: number;
  height: number;
}

declare type TreeType = Array<NodeTree>;

declare interface MatchedMap<T> {
  [key: string]: T[] | {}; // 没有匹配的有可能是空对象
}
