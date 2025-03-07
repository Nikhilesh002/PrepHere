const fs=require("fs")

const x = {
  acRate: 82.28228228228228,
  difficulty: "Hard",
  freqBar: null,
  frontendQuestionId: "3061",
  isFavor: false,
  paidOnly: true,
  status: null,
  title: "Calculate Trapping Rain Water",
  titleSlug: "calculate-trapping-rain-water",
  topicTags: [
    {
      name: "Database",
      id: "VG9waWNUYWdOb2RlOjYxMDQz",
      slug: "database",
    },
  ],
  hasSolution: false,
  hasVideoSolution: false,
};

fs.writeFileSync("temp.json", JSON.stringify(x, null, 2));

// https://github.com/xoraus/CrackingTheSQLInterview
// https://github.com/kansiris/SQL-interview-questions/tree/master?tab=readme-ov-file#what-is-rdbms