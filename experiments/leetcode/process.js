const fs = require("fs");
const free = require("./free.json");

async function main() {
  const data = [];
  free.forEach((question) => {
    const temp = {};
    temp.title = question.title;
    temp.slug = question.titleSlug;
    temp.acRate = question.acRate;
    temp.difficulty = question.difficulty;
    temp.topicTags = question.topicTags;

    temp.descriptionHtml = "";
    temp.descriptionText = "";

    data.push(temp);
  });

  fs.writeFileSync(
    "./leetcode/processedData.json",
    JSON.stringify(data, null, 2)
  );
}

main();
