const data = require("./sample_data.json")
const fs = require("fs");


const { questions } = data;
const processedData = []

// {
//   "submissionId": {
//     "country": "India",
//     "ctc": "40L-50L",
//     "companyName": "Oportun",
//     "yoe": "5-8",
//     "role": "Senior Data Engineer"
//   },
//   "text": "Let's say you have a partitioned table, where one of the partition has huge amount of data and it is getting stuck. how do you handle this situation and what measures do you take?",
//   "category": "scenario based",
//   "difficulty": "Medium",
//   "summary": " Spark partitions",
// },

questions.forEach((question) => {
  if(question){
    const temp={}

    temp.text = question.text.trim();
    temp.summary = question.summary.trim();
    temp.difficulty = question.difficulty.trim();
    temp.category = question.category.trim();

    temp.country = question.submissionId.country.trim();
    temp.ctc = question.submissionId.ctc.trim();
    temp.companyName = question.submissionId.companyName.trim();
    temp.yoe = question.submissionId.yoe.trim();
    temp.role = question.submissionId.role.trim();

    processedData.push(temp)
  }
})

console.log(processedData.length)

fs.writeFileSync(
  "./tayari/allQuestions.json",
  JSON.stringify(processedData, null, 2)
);