# 大纲

## 框架概要

### 思路

#### 阶段一

1. 以 sketchTree 为标准，假设 sketchTree 中的每个节点都是存在的
2. 即可以拿 sketchTree 的每个 **sketchNode**，塞到 **nodeTree** 中进行查找
3. 为增加查找速度，每一次的子节点的查找范围，都是建立在“上一次找到的”叔父节点列表

#### 阶段二

4. 找 codeNode 后的处理

1）新生成的 code 树，返回出来的是代码的结果
2）

```js
/**
 * 问题：怎样定义 “元素存在” 和 “元素偏差” ？
 * - 判断该sketchNode的子节点是否存在
 *
 * *  1） 该sketchNode不存在
 *      - 如果子节点不存在（则可以判断该节点不存在）
 *
 *
 * *  2） 该sketchNode有可能存在，但是样式写错了
 *      - 如果子节点存在（则证明这个sketchNode是存在的，可能是样式偏差）
 *
 */
```

#### 阶段三

- 通过 sketch 标示

### 1. 深度优先遍历 sketchNodeTree 对象

#### 1）处理逻辑

- 取得的每一个 sketchNode 对象，都塞到 codeTree 进行`广度优先查找方法`进行查找

- 如果符合条件的结果，会被推入一个 resultNodeArr 数组，最终，数组会被合并到一个对象里面，如下

```ts

 '0': [
    /**
     * "0" 表示sketch节点在第一层，能匹配到两个code的节点
     *   - 查找的codeTree范围是整颗树
    */
    { name: 'div#app', rectAttr: [Object], children: [Array] },
    { name: 'div.main', rectAttr: [Object], children: [Array] }
  ],
  '1': [
    /**
     * “1“ 表示sketch节点在第二层，匹配到的一个code节点
     *   - 查找的codeTree范围是整颗树
     * */
    { name: 'div.footer', rectAttr: [Object], children: [] },
    { name: 'div.body', rectAttr: [Object], children: [] },
    { name: 'div.header', rectAttr: [Object], children: [] }
  ],
  '2': [
    /**
     * “2” 表示sketch节点在第三层，匹配到一个code节点
     *    - 查找的codeTree范围是
    */

    { name: 'div.footer', rectAttr: [Object], children: [] }
    ],
  '3': []

```

#### 2）结果生成

```json
// sketch.json
{
  "name": "页面 1",
  "rectAttr": { "x": 0, "y": 0, "width": 0, "height": 0 },
  "children": [
    {
      "name": "test1-page",
      "rectAttr": { "x": 493, "y": 270, "width": 375, "height": 667 },
      "children": [
        {
          "name": "footer-container",
          "rectAttr": { "x": 0, "y": 501, "width": 375, "height": 166 },
          "children": [
            {
              "name": "矩形",
              "rectAttr": { "x": 0, "y": 0, "width": 375, "height": 166 },
              "children": []
            }
          ]
        },
        {
          "name": "body-container",
          "rectAttr": { "x": 0, "y": 95, "width": 375, "height": 406 },
          "children": [
            {
              "name": "矩形",
              "rectAttr": { "x": 0, "y": 0, "width": 375, "height": 406 },
              "children": []
            }
          ]
        },
        {
          "name": "header-container",
          "rectAttr": { "x": 0, "y": 0, "width": 375, "height": 95 },
          "children": [
            {
              "name": "矩形",
              "rectAttr": { "x": 0, "y": 0, "width": 375, "height": 95 },
              "children": []
            },
            {
              "name": "Header",
              "rectAttr": { "x": 110.5, "y": 25, "width": 152, "height": 45 },
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
```

```json
// code.json
{
  "name": "div#app",
  "rectAttr": { "x": 0, "y": 0, "width": 375, "height": 667 },
  "children": [
    {
      "name": "div.main",
      "rectAttr": { "x": 0, "y": 0, "width": 375, "height": 667 },
      "children": [
        {
          "name": "div.header",
          "rectAttr": { "x": 0, "y": 0, "width": 375, "height": 95 },
          "children": []
        },
        {
          "name": "div.body",
          "rectAttr": { "x": 0, "y": 95, "width": 375, "height": 406 },
          "children": []
        },
        {
          "name": "div.footer",
          "rectAttr": { "x": 0, "y": 501, "width": 375, "height": 166 },
          "children": []
        }
      ]
    }
  ]
}
```
