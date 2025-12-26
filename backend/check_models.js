require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("🔍 Fetching available models for your API Key...");
        // There isn't a direct listModels on genAI instance in some SDK versions,
        // but let's try a direct fetch if SDK fails, or use the model-based approach.
        // Actually, for @google/generative-ai, we usually just know the models.
        // But let's try to verify if the key works at all with a simple prompt first.

        // Wait, the error message suggested "Call ListModels".
        // In the Node SDK, it's often exposed via the API manager or we just test headers.

        // Let's force a test on "gemini-1.5-flash-latest" specifically
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Test");
        console.log("✅ getGenerativeModel('gemini-1.5-flash') WORKS!");

    } catch (error) {
        console.error("❌ gemini-1.5-flash Failed:", error.message);

        try {
            // Fallback test
            const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
            await model2.generateContent("Test");
            console.log("✅ getGenerativeModel('gemini-pro') WORKS!");
        } catch (err2) {
            console.error("❌ gemini-pro Failed:", err2.message);
            console.log("\n⚠️ Diagnosa: Key mungkin valid tapi tidak punya akses ke model ini.");
        }
    }
}

listModels();
