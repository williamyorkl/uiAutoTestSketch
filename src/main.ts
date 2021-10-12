import puppeteer from "puppeteer";
import { preProcessPuppeTree } from "./parser/parseCodeTree";

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
    const codeTree = await preProcessPuppeTree(entryNode, 0);
    console.log("codeTree：", codeTree);

    await browser.close();
  })();
} catch (error) {
  console.log("error", error);
}
