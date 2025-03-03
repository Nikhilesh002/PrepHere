const { questions } = require("./sample_data.json");
const fs = require("fs");

// console.log(questions[0]);

console.log(questions.length);



const categories=new Set()
const difficulties=new Set()
const summaries=new Set()
const subStatuses=new Set()
const adminContents=new Set()
const countries=new Set()
const ctcs=new Set()
const companyNames=new Set()
const yoes=new Set()
const roles=new Set()

questions.forEach((question) => {
  categories.add(question.category.trim());
  difficulties.add(question.difficulty.trim());
  summaries.add(question.summary.trim());
  subStatuses.add(question.submissionId.status.trim());
  adminContents.add(question.submissionId.adminComment.trim());
  countries.add(question.submissionId.country.trim());
  ctcs.add(question.submissionId.ctc.trim());
  companyNames.add(question.submissionId.companyName.trim());
  yoes.add(question.submissionId.yoe.trim());
  roles.add(question.submissionId.role.trim());
});


fs.appendFile("tmp.txt", "Categories:-\n" +[...categories].join("\n") + "\n\n\n\n\n", (err) => {
  if (err) throw err;
});
fs.appendFile("tmp.txt", "Difficulties:-\n" + [...difficulties].join("\n") + "\n\n\n\n\n", (err) => {
  if (err) throw err;
});
fs.appendFile("tmp.txt", "SubStatuses:-\n" + [...subStatuses].join("\n") + "\n\n\n\n\n", (err) => {
  if (err) throw err;
});
fs.appendFile("tmp.txt", "AdminContents:-\n" + [...adminContents].join("\n") + "\n\n\n\n\n", (err) => {
  if (err) throw err;
});
fs.appendFile("tmp.txt", "Countries:-\n" + [...countries].join("\n") + "\n\n\n\n\n", (err) => {
  if (err) throw err;
});
fs.appendFile("tmp.txt", "Ctcs:-\n" + [...ctcs].join("\n") + "\n\n\n\n\n", (err) => {
  if (err) throw err;
});
fs.appendFile("tmp.txt", "Yoes:-\n" + [...yoes].join("\n") + "\n\n\n\n\n", (err) => {
  if (err) throw err;
});
fs.appendFile("tmp.txt", "Roles:-\n" + [...roles].join("\n") + "\n\n\n\n\n", (err) => {
  if (err) throw err;
});
fs.appendFile("tmp.txt", "CompanyNames:-\n" + [...companyNames].join("\n") + "\n\n\n\n\n", (err) => {
  if (err) throw err;
});
fs.appendFile("tmp.txt", "Summaries:-\n" + [...summaries].join("\n"), (err) => {
  if (err) throw err;
});


// console.log(categories);
// console.log(difficulties);
// console.log(summaries);
// console.log(subStatuses);
// console.log(adminContents);
// console.log(countries);
// console.log(ctcs);
// console.log(companyNames);
// console.log(yoes);
// console.log(roles);