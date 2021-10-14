import puppeteer from "puppeteer";
import { preProcessPuppeTree } from "./parser/parseCodeTree";
import { sketchParsedTree } from "./formatHandler/handleSketchJson";
import { handleRecursiveFindChildren } from "./searcher/findTree";
import { treeShapeType } from "./parser/parseSketchTree";
import { writeFileJson, recursivelyDeleteProps, isSpecificType } from "./utils";

try {
  (async () => {
    // const options = {
    //   headless: false,
    //   args: [`--window-size=375,812`],
    // };

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:8080/");
    await page.setViewport({ width: 375, height: 812 });
    const entryNode = await page?.$("body");

    // * 1. 代码树
    const codeTree = await preProcessPuppeTree(entryNode, 0);
    recursivelyDeleteProps(codeTree, "puppetChildren");
    writeFileJson("./parsedOutput/codeTree.json", codeTree);

    // * 2. sketch树
    const sketchTree = sketchParsedTree;
    recursivelyDeleteProps(sketchTree, "sketchChildren");
    writeFileJson("./parsedOutput/sketchTree.json", sketchTree);

    if (isSpecificType<treeShapeType, {}>(sketchTree, "name", "string")) {
      const res = handleRecursiveFindChildren([sketchTree], [codeTree], 0);

      console.log("🚀 结果：", res);
    }

    // console.log("codeTree：", codeTree);

    await browser.close();
  })();
} catch (error) {
  console.log("error", error);
}
