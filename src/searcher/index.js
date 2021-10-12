function breadthFirstSearch(node, sketchNodeSizeObj) {
  const {
    width: sketchWidth,
    height: sketchHeight,
    x: sketchX,
    y: sketchY,
  } = sketchNodeSizeObj;

  // 判断一个div的边界，允许difference = 50px的偏差
  const defineBoundary = function (val, toMatchVal, difference = 50) {
    if (
      Number(toMatchVal) >= Number(val) - difference &&
      Number(val) + difference >= toMatchVal
    ) {
      return true;
    } else {
      return false;
    }
  };

  // 1）定义一个nodes节点列表
  var nodesArray = [];
  var counter = 1; // 查找次数

  if (node != null) {
    // 2）定义一个队列（先进先出）
    var queue = [];

    // 3）在队头插入一个 node
    queue.unshift(node);

    while (queue.length != 0) {
      var item = queue.shift();

      // 获取node的position
      var nodePosObj = item.getBoundingClientRect();
      const {
        width: nodeWidth,
        height: nodeHeight,
        x: nodeX,
        y: nodeY,
      } = nodePosObj;

      // 获取node的computed属性
      var nodeComputedObj = window.getComputedStyle(item);

      // 条件结果
      var condition1 =
        defineBoundary(sketchWidth, nodeWidth) &&
        defineBoundary(sketchHeight, nodeHeight);

      var condition2 =
        defineBoundary(sketchX, nodeX) && defineBoundary(sketchY, nodeY);

      var condition3 =
        nodeComputedObj.fontSize === sketchNodeSizeObj.fontSize &&
        nodeComputedObj.color === sketchNodeSizeObj.color;

      if (condition1 && condition2) {
        nodesArray.push(item);
        //                 break // 是否贪婪
      }

      var children = item.children;

      for (var i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }

      // 每次查找 + 1
      counter++;
    }
  }
  return { nodesArray, counter };
}

var mainNode = document.querySelector(".page");

// 设计稿传入的node节点
var sketchNodeSizeObj = {
  x: 55,
  y: 180,
  width: 271.5,
  height: 22,
};

// 开始查找（开发稿Nodes，设计稿传入节点）
const { nodesArray } = breadthFirstSearch(mainNode, sketchNodeSizeObj);

breadthFirstSearch();
