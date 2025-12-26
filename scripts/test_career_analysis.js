const { generateCareerAnalysisPrompt } = require('../prompts/career_analysis');

const sampleCV = `
John Doe
Software Engineer
Skills: JavaScript, React, Node.js
Experience: 2 years at Tech Corp
Education: BS in Computer Science
`;

const prompt = generateCareerAnalysisPrompt(sampleCV, 'fresh_graduate', 'yes', 'Global');

console.log("=== GENERATED PROMPT PREVIEW ===");
console.log(prompt);
console.log("================================");

// Basic validation
if (prompt.includes(sampleCV) && prompt.includes('fresh_graduate')) {
    console.log("✅ Prompt generation test PASSED: Data injection successful.");
} else {
    console.error("❌ Prompt generation test FAILED: Data injection failed.");
    process.exit(1);
}
