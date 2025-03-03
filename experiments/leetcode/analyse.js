const data = require("./fullyProcessedData.json");
const fs = require("fs");

// {
//   "title": "Big Countries",
//   "slug": "big-countries",
//   "acRate": 68.19682289703853,
//   "difficulty": "Easy",
//   "topicTags": [
//     {
//       "name": "Database",
//       "id": "VG9waWNUYWdOb2RlOjYxMDQz",
//       "slug": "database"
//     }
//   ],
//   "descriptionHtml": "<p>Table: <code>World</code></p>\n\n<pre>+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| name        | varchar |\n| continent   | varchar |\n| area        | int     |\n| population  | int     |\n| gdp         | bigint  |\n+-------------+---------+\nname is the primary key (column with unique values) for this table.\nEach row of this table gives information about the name of a country, the continent to which it belongs, its area, the population, and its GDP value.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>A country is <strong>big</strong> if:</p>\n\n<ul>\n\t<li>it has an area of at least&nbsp;three million (i.e., <code>3000000 km<sup>2</sup></code>), or</li>\n\t<li>it has a population of at least&nbsp;twenty-five million (i.e., <code>25000000</code>).</li>\n</ul>\n\n<p>Write a solution to find the name, population, and area of the <strong>big countries</strong>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nWorld table:\n+-------------+-----------+---------+------------+--------------+\n| name        | continent | area    | population | gdp          |\n+-------------+-----------+---------+------------+--------------+\n| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |\n| Albania     | Europe    | 28748   | 2831741    | 12960000000  |\n| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |\n| Andorra     | Europe    | 468     | 78115      | 3712000000   |\n| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |\n+-------------+-----------+---------+------------+--------------+\n<strong>Output:</strong> \n+-------------+------------+---------+\n| name        | population | area    |\n+-------------+------------+---------+\n| Afghanistan | 25500100   | 652230  |\n| Algeria     | 37100000   | 2381741 |\n+-------------+------------+---------+\n</pre>\n",
//   "descriptionText": "Can you solve this real interview question? Big Countries - Table: World\n\n\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| name        | varchar |\n| continent   | varchar |\n| area        | int     |\n| population  | int     |\n| gdp         | bigint  |\n+-------------+---------+\nname is the primary key (column with unique values) for this table.\nEach row of this table gives information about the name of a country, the continent to which it belongs, its area, the population, and its GDP value.\n\n\n \n\nA country is big if:\n\n * it has an area of at least three million (i.e., 3000000 km2), or\n * it has a population of at least twenty-five million (i.e., 25000000).\n\nWrite a solution to find the name, population, and area of the big countries.\n\nReturn the result table in any order.\n\nThe result format is in the following example.\n\n \n\nExample 1:\n\n\nInput: \nWorld table:\n+-------------+-----------+---------+------------+--------------+\n| name        | continent | area    | population | gdp          |\n+-------------+-----------+---------+------------+--------------+\n| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |\n| Albania     | Europe    | 28748   | 2831741    | 12960000000  |\n| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |\n| Andorra     | Europe    | 468     | 78115      | 3712000000   |\n| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |\n+-------------+-----------+---------+------------+--------------+\nOutput: \n+-------------+------------+---------+\n| name        | population | area    |\n+-------------+------------+---------+\n| Afghanistan | 25500100   | 652230  |\n| Algeria     | 37100000   | 2381741 |\n+-------------+------------+---------+\n"
// }

const difficulties = new Set();

let easy = 0,
  medium = 0,
  hard = 0;

data.forEach((q) => {
  difficulties.add(q.difficulty);

  if (q.difficulty === "Easy") easy++;
  if (q.difficulty === "Medium") medium++;
  if (q.difficulty === "Hard") hard++;
});

fs.writeFileSync(
  "./leetcode/analyse.json",
  JSON.stringify(
    { difficulties: [...difficulties], easy, medium, hard },
    null,
    2
  )
);

console.log(difficulties);
console.log(easy, medium, hard);
