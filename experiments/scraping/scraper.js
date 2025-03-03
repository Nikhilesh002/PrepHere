const puppeteer = require("puppeteer");
const processedData = require("../leetcode/processedData.json");
const fs = require("fs");

const scraper = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    devtools: false,
  });

  const promises = processedData.slice(0,3).map(async (question) => {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    );

    return worker(page, question);
  });

  const data = await Promise.all(promises);

  console.log("scraped " + data.length + " questions");

  await browser.close();

  fs.writeFileSync(
    "./leetcode/fullyProcessedData-2.json",
    JSON.stringify(data, null, 2)
  );
};

async function worker(page, question) {
  const url = `https://leetcode.com/problems/${question.slug}`;

  const resp = await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  console.log(resp.status());

  const data = await page.evaluate(() => {
    const temp = {};

    const meta = document.querySelector('meta[property="og:description"]');
    if (meta) {
      temp.descriptionText = meta.getAttribute("content");
    }

    const descriptionHtml = document.querySelector('div[class="elfjS"]');
    if (descriptionHtml) {
      temp.descriptionHtml = descriptionHtml.outerHTML;
    }

    return temp;
  });

  console.log("scraped " + question.title);

  return { ...question, ...data };
}

async function main() {
  await scraper();
}

main();
