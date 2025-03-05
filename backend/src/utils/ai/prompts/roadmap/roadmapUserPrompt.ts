import { IQuestionare } from "../../../../models/questionare";

export const makeRoadmapUserPrompt = (questionare: IQuestionare): string => {
  const prompt = `
# SQL Preparation Kit Roadmap Request

You are an expert in SQL and Data Engineering. Based on the candidate’s preferences and background provided below, generate a customized SQL preparation kit roadmap. The roadmap must focus exclusively on SQL queries and cover topics from fundamentals to advanced techniques, while addressing both strengths and areas for improvement as indicated in the "challenges" field.

Candidate Details:
- **Experience Level**: ${questionare.yoe} Data Engineer
- **Target Company**: ${questionare.companyName}
- **Strengths and Areas for Improvement**: ${questionare.challenges}
- **Preferred Difficulty**: ${questionare.difficulty}
- **Study Commitment**: ${questionare.noOfWeeks} weeks, ${questionare.noOfHoursPerWeek} hours per week
- **Focus Area**: SQL queries
- **Role Context**: ${questionare.role}
- **Target Market Standards**: ${questionare.country}

Instructions:
1. Create a weekly roadmap that progresses logically from basic to advanced SQL topics.
2. Tailor the content to match the candidate's experience, study commitment, and the market standards of the target country.
3. Integrate the candidate’s strengths and weaknesses (provided as a single string) to emphasize areas that need improvement while reinforcing existing skills.
4. **Output the complete roadmap in valid JSON format only**, strictly following this structure:
{"roadmap": [[week1_topics], [week2_topics], ...]}

5. Do not include any extraneous text or formatting; ensure that the output is a valid JSON object.

Example Outputs:

**Example 1: Beginner Roadmap (0-2 years, 6 weeks × 10h/week) with no prior SQL experience**
{
  "roadmap": [
    ["Introduction to SQL Syntax and Data Types", "Basic SELECT and FROM statements"],
    ["Filtering Data with WHERE and ORDER BY", "Simple Aggregate Functions (COUNT, SUM, AVG)"],
    ["Basic JOIN Operations and Subqueries", "Data Manipulation (INSERT, UPDATE, DELETE)"],
    ["Hands-on Practice: Writing Simple Queries and Mini Projects"]
  ]
}

**Example 2: Beginner Roadmap emphasizing improvement in JOINs (Weakness: JOINs; Strength: WHERE clauses)**
{
  "roadmap": [
    ["Review of SQL Basics and Data Types", "Introduction to Advanced JOIN Concepts"],
    ["Filtering Techniques: WHERE, GROUP BY, and HAVING", "Understanding Subqueries"],
    ["Exploring JOIN Variants: INNER, LEFT, RIGHT, FULL", "Optimizing JOIN Performance"],
    ["Practice Project: Combining Data from Multiple Tables"]
  ]
}

**Example 3: Intermediate Roadmap (2-5 years, 4 weeks × 15h/week)**
{
  "roadmap": [
    ["Advanced SQL Syntax and Best Practices", "Query Optimization Techniques"],
    ["Complex JOINs, Nested Subqueries, and CTEs", "Indexing and Performance Tuning"],
    ["Stored Procedures, Triggers, and Advanced Functions", "Transaction Management"],
    ["Big Data Handling: Partitioning, Sharding, and Advanced Aggregation"],
    ["Capstone Project: Designing an End-to-End Data Pipeline with Complex Queries"]
  ]
}
`;
  return prompt;
};
