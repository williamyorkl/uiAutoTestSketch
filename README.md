# 大纲

## 框架概要

### 1. 深度优先遍历 sketchNodeTree 对象

#### 1）处理逻辑

- 取得的每一个 sketchNode 对象，都塞到`广度优先查找方法`进行查找

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
