import { MatchedMap, TreeType } from "../../typings/basicTree";
import type { treeShapeType as codeTreeShapeType } from "../parser/parseCodeTree";
import type { treeShapeType as sketchTreeShapeType } from "../parser/parseSketchTree";
import * as condition from "./conditions";

/** 代码node树 */
const mainNode: TreeType = [
  {
    name: "mainNode",
    rectAttr: {
      x: 0,
      y: 0,
      width: 375,
      height: 812,
    },
    children: [
      // code: 第一个父节点
      {
        name: "cNode1",
        rectAttr: {
          x: 25,
          y: 55,
          width: 300,
          height: 400,
        },
        children: [
          {
            name: "ccNode1",
            rectAttr: {
              x: 40,
              y: 70,
              width: 100,
              height: 100,
            },
            children: [
              {
                name: "cccNode1",
                rectAttr: {
                  x: 50,
                  y: 80,
                  width: 100,
                  height: 100,
                },
                children: null,
              },
            ],
          },
        ],
      },
      // code: 第二个父节点
      {
        name: "cNode2",
        rectAttr: {
          x: 125,
          y: 155,
          width: 1300,
          height: 1400,
        },
        children: [
          {
            name: "ccNode2",
            rectAttr: {
              x: 56,
              y: 72,
              width: 100,
              height: 100,
            },
            children: [
              {
                name: "cccNode2",
                rectAttr: {
                  x: 54,
                  y: 83,
                  width: 100,
                  height: 100,
                },
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
];

/** sketchNode树 */
const sketchJsonList: TreeType = [
  {
    name: "sMainNode",
    rectAttr: {
      x: 0,
      y: 0,
      width: 375,
      height: 812,
    },
    children: [
      // 第一个父节点
      {
        name: "sFNode1",
        rectAttr: {
          x: 25,
          y: 55,
          width: 300,
          height: 400,
        },
        children: [
          {
            name: "sCCNode1",
            rectAttr: {
              x: 40,
              y: 70,
              width: 100,
              height: 100,
            },
            children: [
              {
                name: "cccNode1",
                rectAttr: {
                  x: 50,
                  y: 80,
                  width: 100,
                  height: 100,
                },
                children: null,
              },
            ],
          },
        ],
      },
      // 第二个父节点
      {
        name: "sFNode2",
        rectAttr: {
          x: 125,
          y: 155,
          width: 1300,
          height: 1400,
        },
        children: [
          {
            name: "scNode2",
            rectAttr: {
              x: 56,
              y: 72,
              width: 100,
              height: 100,
            },
            children: [
              {
                name: "sccNode2",
                rectAttr: {
                  x: 54,
                  y: 83,
                  width: 100,
                  height: 100,
                },
                children: null,
              },
            ],
          },
        ],
      },
      // 第三个父节点
      {
        name: "sFNode3",
        rectAttr: {
          x: 225,
          y: 255,
          width: 2300,
          height: 2400,
        },
        children: null,
      },
    ],
  },
];

/**
 * 查找核心：
 * （假如我想知道字体的颜色有没有对应上？）
 *
 *
 *  1）第一次遍历sketch的第一层children，传入sketch的节点(层1)到 code树[0]
 *     ===> 获得第一层 “node节点列表” 与 “sketch节点列表” 对应的数组列表 list1
 *
 *  2）第二次遍历sketch的第二层children，传入sketch的节点(层2)到 code树[1]
 *     ===> 获得第二层 “node节点列表” 与 “sketch节点列表” 对应的数组列表 list2
 *
 *  .
 *  .
 *  .
 *  （一直到sketch最小的那层，例如是“层3”）
 *
 *  3）最小的那层传入到code树[1]，如下情况：
 *    - 找到对应code树的节点
 *      - 匹配color
 *      - 匹配font-family
 *      若都可以匹配上，则说明一样，输出结果；如果匹配补上，输出匹配失败的结果
 *
 *    - 找不到对应code树的节点
 *      - 有待考虑处理结果
 */

/**
 *
 * @param {object} sNode sketch图的节点对象
 * @param {object} node 整颗树的节点对象
 * @returns {array} [code父节点1，code父节点2, ... ]
 */
export function breadthFirstSearch(
  sNode: sketchTreeShapeType,
  node: codeTreeShapeType,
  lazyFind: boolean = false
): Array<codeTreeShapeType> {
  const { rectAttr: sNodeAttr } = sNode;

  let nodes = [];
  if (node != null) {
    let queue = [];
    queue.unshift(node); // 在队列的开头插入
    while (queue.length != 0) {
      let item = queue.shift();
      const { rectAttr: codeNodeAttr } = item;

      /* TODO - 判断条件 */
      if (
        condition.widthHeight(sNodeAttr, codeNodeAttr) &&
        condition.xY(sNodeAttr, codeNodeAttr)
      ) {
        nodes.push(item);

        // * 判断懒查找（如果是懒查找，则返回匹配到的第一个节点则退出查找）
        if (lazyFind) {
          break;
        }
      }

      let children = item.children;
      if (!children || children?.length === 0) {
        continue;
      }
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }
    }
  }
  return nodes;
}

/**
 *  返回一个符合条件的节点数组 [node1,node2]
 * @param {Array} sketchTree
 * @param {Array} codeTree
 */
function handleFindTree(sketchTree, codeTree) {
  const matchFatherNodeList = [];
  // 遍历sketchTree的父节点
  sketchTree[0].children.forEach((sNode) => {
    const resArr = breadthFirstSearch(sNode, codeTree);

    matchFatherNodeList.push(...resArr);
  });

  return matchFatherNodeList;
}

//  * 一、获取到对应sketch树的code的父节点

const codeFatherNodeList = handleFindTree(sketchJsonList, mainNode[0]);
// console.log("🚀 符合条件的code父节点：", codeFatherNodeList);

// * 二、遍历第一个sketch节点的children，是否在matchedCode父节点中
// function handleFindChildNode() {
//   const matchChildNode = [];
//   sketchJsonList[0].children.forEach((sCNode, sCIndex) => {
//     // 每个sketch的父1节点进入
//     if (sCNode.children) {
//       sCNode.children.forEach((scNode3) => {
//         // 遍历每个父节点的子节点，传入广度遍历中；限制搜索范围是：第一颗code父亲的树
//         const res = breadthFirstSearch(scNode3, codeFatherNodeList[sCIndex]);
//         matchChildNode.push(...res);

//         // 如果scNode3还有子节点
//         if (scNode3.children) {
//           scNode3.children.forEach((scNode4) => {
//             const res = breadthFirstSearch(
//               scNode4,
//               codeFatherNodeList[sCIndex]
//             );
//             matchChildNode.push(...res);
//           });
//         }
//       });
//     }
//   });

//   return matchChildNode;
// }
// const res2 = handleFindChildNode();
// console.log("🚀 符合条件的子节点:", res2);

// * 三、改造"第一、二步"成为递归函数
/**
 *
 * TODO: 1. 查找失败的node节点，需要标记一个“标示位”
 * TODO: 2. 需要保存一个上一次查找的父亲节点（即如果子节点没有找到，怎样标示其位置？）
 *
 */

// let res = handleRecursiveFindChildren(sketchJsonList, mainNode, 0);

export function handleRecursiveFindChildren(
  sketchTree: sketchTreeShapeType[],
  codeTree: codeTreeShapeType[],
  sketchCounter: number | null,
  originalCompleteCodeTree: codeTreeShapeType[]
) {
  const orlCodeTreeRef = originalCompleteCodeTree;

  const matchedNodeMap: MatchedMap<codeTreeShapeType> = {};

  const lastTimeSawFatherNode = "";

  //  遍历传入的sketchTree
  for (let sIndex = 0; sIndex < sketchTree.length; sIndex++) {
    const matchNodeList: codeTreeShapeType[] = []; // [fNode1,fNode2, ... ]

    // 定义节点
    const sNode = sketchTree[sIndex];

    // 定义子节点
    const sNodeChildrenList = sNode.children;

    /** 递归终结条件 */
    if (!sNodeChildrenList || sNodeChildrenList?.length === 0) return;

    // 1）遍历当前children list下的item在 code树的匹配项
    sNodeChildrenList.forEach((ssNode, ssIndex) => {
      // 传入sketchNode节点，在codeTree广度遍历查找匹配的节点

      // const resultNodeArray = breadthFirstSearch(ssNode, codeTree[sIndex]);

      /**
       * * 三种查找情况
       *  1） 在其父节点没找到，则在叔父节点找
       *  2） 在其叔父节点没找到，则在根节点懒查找
       *  3） 在根节点也没找到，则判断：节点没有存在 或 节点偏差
       */

      /** 定义查找结果列表 */
      const resultNodeArray = [];

      // *  1） 在其父节点没找到，则在叔父节点找
      resultNodeArray.push(...breadthFirstSearch(ssNode, codeTree[sIndex]));

      if (resultNodeArray.length === 0) {
        // * 2） 在其父节点没找到，则在叔父节点找
        codeTree.forEach((codeNode) => {
          resultNodeArray.push(...breadthFirstSearch(ssNode, codeNode));
        });

        // *  3）在其叔父节点没找到，则在根节点懒查找
        if (resultNodeArray.length === 0) {
          resultNodeArray.push(
            ...breadthFirstSearch(ssNode, orlCodeTreeRef[0], true)
          );
        }
      }

      // 结果保存在matchNodeList
      matchNodeList.push(...Array.from(new Set(resultNodeArray)));
    });

    // 获取到 matchNodeList 结果后，递归传入
    matchedNodeMap[sketchCounter] = matchNodeList;

    // key + 1，然后作为参数往下传递
    sketchCounter++;

    Object.assign(
      matchedNodeMap,
      handleRecursiveFindChildren(
        sNodeChildrenList,
        matchNodeList,
        sketchCounter,
        orlCodeTreeRef
      )
    );
  }
  // ! 注意要等所有的子节点遍历完
  return matchedNodeMap;
}

// handleRecursiveFindChildren

// * 四、 添加各种匹配条件
