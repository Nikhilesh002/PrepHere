const one = require("./one.json");
const two = require("./two.json");
const three = require("./three.json");

const fs = require("fs");

function getFree(x, freeQuestions) {
  const questions = x.data.problemsetQuestionList.questions;

  questions.forEach((question) => {
    if (!question.paidOnly) {
      freeQuestions.push(question);
    }
  });
}

function main() {
  const freeQuestions = [];

  getFree(one, freeQuestions);
  getFree(two, freeQuestions);
  getFree(three, freeQuestions);

  console.log(freeQuestions.length);
  fs.writeFileSync("free.json", JSON.stringify(freeQuestions, null, 2));
}

main();