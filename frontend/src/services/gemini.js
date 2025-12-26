import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeWithGemini = async (apiKey, prompt) => {
    if (!apiKey) throw new Error("API Key is missing.");

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to analyze with Gemini. Check your API Key or quota.");
    }
};
