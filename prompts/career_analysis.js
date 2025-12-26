/**
 * Generates the Career Analysis Master Prompt based on user input.
 * 
 * @param {string} cvText - The extracted text from the user's CV.
 * @param {string} careerStage - 'student', 'fresh_graduate', or 'professional'.
 * @param {string} isEntrepreneurial - 'yes' or 'no'.
 * @param {string} targetRegion - 'Indonesia' or 'Global'.
 * @returns {string} The formatted prompt string.
 */
function generateCareerAnalysisPrompt(cvText, careerStage, isEntrepreneurial, targetRegion) {
  return `
🧠 1️⃣ MASTER PROMPT
AI CV → Career Roadmap Analyzer

ROLE & CONTEXT

You are a professional career analyst, labor market researcher, and startup mentor.
Your task is to analyze a user's CV and generate a comprehensive, realistic, and data-driven career analysis.

The analysis must be:
- Practical (actionable steps)
- Structured
- Easy to understand
- Suitable for students, fresh graduates, and early professionals

This is NOT a fortune-telling tool.
This is a career guidance system based on skills, experience, and global labor market trends.


INPUT (DARI SYSTEM)

User CV content:
${cvText}

User context:
- Career stage: ${careerStage}
- Interest in entrepreneurship: ${isEntrepreneurial}
- Target region: ${targetRegion}


TASK INSTRUCTIONS

Analyze the CV and generate:

1. A concise professional profile summary
2. Extracted hard skills and soft skills
3. Strengths and gaps
4. Top career matches with percentage scores
5. A realistic year-by-year career roadmap (up to 10 years)
6. Entrepreneurial potential analysis (if applicable)
7. Actionable next steps for the next 12 months
8. References to credible labor market sources (generic, not links)

Be realistic.
Avoid exaggeration.
Use neutral and professional language.

📊 2️⃣ OUTPUT FORMAT (JSON – FIX)

⚠️ WAJIB JSON supaya gampang dirender ke web, PDF, dan IG Story

{
  "profile_summary": "",
  "skills": {
    "hard_skills": [],
    "soft_skills": []
  },
  "strengths": [],
  "skill_gaps": [],
  "career_matches": [
    {
      "career": "",
      "match_score": 0,
      "reason": ""
    }
  ],
  "career_roadmap": [
    {
      "year_range": "",
      "focus": "",
      "recommended_actions": []
    }
  ],
  "entrepreneur_potential": {
    "is_suitable": true,
    "recommended_fields": [],
    "product_ideas": [],
    "suggested_start_period": ""
  },
  "next_12_months_plan": [],
  "references": []
}

🧪 3️⃣ CONTOH OUTPUT (RINGKAS)
"profile_summary": "A technology-focused graduate with strong analytical skills and growing experience in data-driven projects."

"career_matches": [
  {
    "career": "Data Analyst",
    "match_score": 88,
    "reason": "Strong alignment with analytical skills, tools, and academic background."
  }
]

"career_roadmap": [
  {
    "year_range": "2025",
    "focus": "Skill strengthening",
    "recommended_actions": [
      "Improve SQL and Python",
      "Build 2 real-world data projects"
    ]
  }
]

🚀 4️⃣ PROMPT TAMBAHAN UNTUK IG STORY (RINGKAS & CATCHY)

Gunakan prompt kedua khusus buat story card 👇

From the full career analysis, generate a short, catchy career snapshot suitable for an Instagram Story.

Rules:
- Max 40 words
- Simple language
- Motivational but realistic
- Highlight:
  - Top career match
  - Career focus period
  - Entrepreneur potential (if any)

Output as plain text only.

🎯 Contoh hasil IG Story:

Top Career Match: Data Analyst (88%)
2025–2027: Focus on data skills & real projects
Strong potential to build an EdTech product

🔧 5️⃣ CATATAN IMPLEMENTASI (PENTING)
✅ Supaya hasil konsisten:

Selalu kirim CV_TEXT yang sudah dibersihkan

Jangan kirim PDF mentah → extract text dulu

Set temperature rendah (0.2–0.4)

🔐 Privasi:

Tambahkan system instruction:

Do not store or remember any user data.
Do not use this CV for training purposes.
`;
}

module.exports = { generateCareerAnalysisPrompt };
