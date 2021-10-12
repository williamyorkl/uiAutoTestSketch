import puppeteer from "puppeteer";
import { preProcessPuppeTree } from "./parser/parseCodeTree";
import { sketchParsedTree } from "./formatHandler/handleSketchJson";
import { handleRecursiveFindChildren } from "./searcher/findTree";

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

    // * 代码树
    const codeTree = await preProcessPuppeTree(entryNode, 0);

    // * sketch树
    const sketchTree = sketchParsedTree;

    if (Object.keys(sketchTree).length === 0) return;

    const res = handleRecursiveFindChildren([sketchTree], [codeTree], 0);

    console.log("🚀 结果：", res);

    // console.log("codeTree：", codeTree);

    await browser.close();
  })();
} catch (error) {
  console.log("error", error);
}
