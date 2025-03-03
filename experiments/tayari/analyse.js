const data = require("./extractedData.json");
const fs = require("fs");

// {
//   "difficulty": "Medium",
//   "category": "scenario based",
//   "country": "India",
//   "ctc": "40L-50L",
//   "companyName": "Oportun",
//   "yoe": "5-8",
//   "role": "Senior Data Engineer"
// },

const difficulties = new Set();
const categories = new Set();
const countries = new Set();
const ctcs = new Set();
const companyNames = new Set();
const yoes = new Set();
const roles = new Set();

const frequency = {};

data.forEach((question) => {
  difficulties.add(question.difficulty.trim());
  categories.add(question.category.trim());
  countries.add(question.country.trim());
  ctcs.add(question.ctc.trim());
  companyNames.add(question.companyName.trim());
  yoes.add(question.yoe.trim());
  roles.add(question.role.trim());

  const cn = question.companyName.trim();
  if (frequency[cn]) {
    frequency[cn]++;
  } else {
    frequency[cn] = 1;
  }
});

const sortedFreq = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

fs.writeFileSync(
  "./tayari/analysis.json",
  JSON.stringify(
    {
      difficulties: [...difficulties],
      categories: [...categories],
      countries: [...countries],
      ctcs: [...ctcs],
      yoes: [...yoes],
      roles: [...roles],
      frequency,
      sortedFreq,
      companyNames: [...companyNames],
    },
    null,
    2
  )
);
