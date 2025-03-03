const fullyProcessedData = require("./fullyProcessedData.json");

// {
//   "title": "Triangle Judgement",
//   "slug": "triangle-judgement",
//   "acRate": 73.26461628135796,
//   "difficulty": "Easy",
//   "topicTags": [
//     {
//       "name": "Database",
//       "id": "VG9waWNUYWdOb2RlOjYxMDQz",
//       "slug": "database"
//     }
//   ],
//   "descriptionHtml": "<p>Table: <code>Triangle</code></p>\n\n<pre>+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| x           | int  |\n| y           | int  |\n| z           | int  |\n+-------------+------+\nIn SQL, (x, y, z) is the primary key column for this table.\nEach row of this table contains the lengths of three line segments.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Report for every three line segments whether they can form a triangle.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nTriangle table:\n+----+----+----+\n| x  | y  | z  |\n+----+----+----+\n| 13 | 15 | 30 |\n| 10 | 20 | 15 |\n+----+----+----+\n<strong>Output:</strong> \n+----+----+----+----------+\n| x  | y  | z  | triangle |\n+----+----+----+----------+\n| 13 | 15 | 30 | No       |\n| 10 | 20 | 15 | Yes      |\n+----+----+----+----------+\n</pre>\n",
//   "descriptionText": "Can you solve this real interview question? Triangle Judgement - Table: Triangle\n\n\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| x           | int  |\n| y           | int  |\n| z           | int  |\n+-------------+------+\nIn SQL, (x, y, z) is the primary key column for this table.\nEach row of this table contains the lengths of three line segments.\n\n\n \n\nReport for every three line segments whether they can form a triangle.\n\nReturn the result table in any order.\n\nThe result format is in the following example.\n\n \n\nExample 1:\n\n\nInput: \nTriangle table:\n+----+----+----+\n| x  | y  | z  |\n+----+----+----+\n| 13 | 15 | 30 |\n| 10 | 20 | 15 |\n+----+----+----+\nOutput: \n+----+----+----+----------+\n| x  | y  | z  | triangle |\n+----+----+----+----------+\n| 13 | 15 | 30 | No       |\n| 10 | 20 | 15 | Yes      |\n+----+----+----+----------+\n"
// }

function check(item) {
  if (item === "" || item === null || item === undefined) return false;
  return true;
}

function checkNum(item) {
  if (item === null || item === undefined || isNaN(item)) return false;
  return true;
}

function main() {
  fullyProcessedData.forEach((item) => {
    if (
      check(item.descriptionHtml) &&
      check(item.descriptionText && check(item.slug)) &&
      check(item.difficulty) &&
      checkNum(item.acRate)
    ) {
    } else console.log(item);
  });
}

main();
