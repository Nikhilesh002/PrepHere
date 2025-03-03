import { IQuestionare } from "../../../../models/questionare";

export const makeRoadmapUserPrompt = (questionare: IQuestionare): string => {
  // create prompt
  const prompt = `
# Create a SQL roadmap for a ${questionare.yoe} Data Engineer targeting ${questionare.companyName} in ${questionare.country} with ${questionare.challenges} challenges. Parameters:
- Current CTC: ${questionare.ctc}
- Preferred Difficulty: ${questionare.difficulty}
- Study Commitment: ${questionare.noOfWeeks} weeks x ${questionare.noOfHoursPerWeek} hours/week
- Focus Areas: ${questionare.category}
- Role Context: ${questionare.role}

## Prioritize these DE-specific topics in order:
1. Data Modeling Patterns
2. Query Optimization
3. ETL Pipeline SQL
4. Partitioning/Indexing
5. Window Functions
6. Execution Plans

## Follow this progression framework:
Week 1-2: Fundamentals & Syntax
Week 3-4: Complex Operations
Week 5-6: Performance Tuning
Week 7+: Specialized Patterns

## Include these essential topics at appropriate stages, according to their experience and complexity:
- Star Schema Design
- CTE vs Temp Tables
- Query Profiling
- Bulk Operations
- Index Selection
- Partition Pruning
- Query Caching
- Query Logging
- Query Profiling

## Consider these additional points:
- For YOE <2: Adds "Database Normalization" and "ACID Properties"
- For CTC >30L: Includes "Cost-Based Optimization" and "Cloud SQL"
- When time <20 hours: Merges related topics into intensive sessions
- For ETL Roles: Emphasizes "Incremental Loads" and "CDC Patterns"

#Format response as JSON only: {"roadmap": [[week1_topics], [week2_topics], ...]}

** Example output: **
{
  "roadmap": [
    ["Relational Database Basics", "SQL Syntax Fundamentals", "Data Types & Constraints"],
    ["Single-table Operations", "Basic Joins (Inner/Left)", "Simple Aggregations"],
    ["Complex Joins (Right/Full/Cross)", "Subqueries", "CTEs"],
    ["Window Functions", "Query Optimization Basics", "Indexing 101"],
    ["Execution Plan Analysis", "Partitioning Strategies", "ETL Pattern Implementation"],
    ["Advanced Indexing", "Query Profiling", "Bulk Operations"],
    ["Star Schema Optimization", "Materialized Views", "Company-Specific Patterns"]
  ]
}
  `;

  return prompt;
};
