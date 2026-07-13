const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("file:///c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html", {waitUntil: "networkidle0"});
  
  const before = await page.evaluate(() => document.getElementById("page-home").className);
  
  await page.evaluate(() => window.navigate("products"));
  
  const after = await page.evaluate(() => document.getElementById("page-home").className);
  const products = await page.evaluate(() => document.getElementById("page-products").className);
  const homeDisplay = await page.evaluate(() => getComputedStyle(document.getElementById("page-home")).display);
  
  console.log({before, after, products, homeDisplay});
  
  await browser.close();
})();
