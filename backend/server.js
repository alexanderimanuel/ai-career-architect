require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Key Validation & Setup
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ FATAL: GEMINI_API_KEY is missing in .env file");
} else if (apiKey.includes("PLACE_YOUR_API_KEY")) {
    console.error("❌ FATAL: Placeholder key detected. Please use real API Key.");
} else {
    // Log masked key for verification
    const masked = apiKey.length > 8
        ? apiKey.substring(0, 4) + "*".repeat(apiKey.length - 8) + apiKey.substring(apiKey.length - 4)
        : "****";
    console.log(`✅ Loaded API Key: ${masked}`);

    if (apiKey.trim() !== apiKey) {
        console.warn("⚠️ WARNING: API Key has leading/trailing spaces. This may cause errors.");
    }
}

const genAI = new GoogleGenerativeAI(apiKey);

// Helper to try multiple models
async function maximizeAnalysis(prompt) {
    // Models confirmed via list_models_v2.js
    const modelsToTry = [
        "gemini-2.0-flash",         // Newest & Fastest
        "gemini-flash-latest",      // Reliable alias
        "gemini-pro-latest",         // Fallback pro
        "gemini-2.0-flash-exp"      // Experimental fallback
    ];

    let lastError = null;

    for (const modelName of modelsToTry) {
        try {
            console.log(`🤖 Trying model: ${modelName}...`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: { responseMimeType: "application/json" }
            });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return JSON.parse(response.text()); // Success!
        } catch (error) {
            console.warn(`⚠️ Failed with ${modelName}: ${error.message}`);
            lastError = error;
            // Continue to next model
        }
    }
    // Throw the *last* error to help debug why all failed
    throw new Error(`All models failed. Last error: ${lastError?.message || 'Unknown error'}`);
}

// Routes
app.get('/', (req, res) => {
    res.send('Career Roadmap AI Backend is Running');
});

app.post('/api/analyze', async (req, res) => {
    console.log("📥 Received analysis request...");
    const { cvText, careerStage, isFounder } = req.body;

    if (!cvText) {
        return res.status(400).json({ error: 'CV Text is required' });
    }

    // Construct the prompt securely on the server side
    const prompt = `
        Role: Senior Tech Career Consultant & AI Architect.
        Task: Analisis CV berikut dan berikan roadmap karir strategis dalam BAHASA INDONESIA yang santai, profesional, dan mudah dipahami.
        IMPORTANT: ALL OUTPUT CONTENT MUST BE IN INDONESIAN.
        
        Candidate Profile:
        - Career Stage: ${careerStage || 'Unknown'}
        - Interested in becoming a Founder: ${isFounder ? 'Yes' : 'No'}
        
        CV Content:
        """
        ${cvText.substring(0, 15000)} 
        """
        
        Output Requirement:
        Return a valid JSON object strictly matching this schema (NO MARKDOWN BLOCK, JUST RAW JSON).
        The goal is to provide HIGHLY ACTIONABLE and VISUAL insights.

        {
            "analysis": {
                "matchScore": 85, 
                "careerPath": ["Posisi Saat Ini", "Langkah Selanjutnya", "Tujuan Akhir"], 
                "summary": "Ringkasan eksekutif profil dalam Bahasa Indonesia yang memotivasi.",
                "strengths": [ 
                    { "skill": "Nama Skill", "level": 90 }
                ],
                "gaps": [ 
                    { "skill": "Nama Skill", "current": 30, "target": 80, "action": "Saran aksi dalam Bahasa Indonesia" }
                ],
                "recommendations": [ 
                    { "title": "Area Fokus", "description": "Saran spesifik dan detail dalam Bahasa Indonesia." }
                ]
            }
        }
        
        Ensure "matchScore" is realistic based on gaps.
        Ensure "gaps" are relevant to achieving the "Next Logical Step".
    `;

    if (!apiKey || apiKey.includes('PLACE_YOUR_API_KEY')) {
        return res.status(500).json({ error: 'Server API Key not configured' });
    }

    try {
        const data = await maximizeAnalysis(prompt);
        console.log("✅ Analysis success!");
        res.json(data);

    } catch (error) {
        console.error('❌ Final API Error:', error);
        res.status(500).json({
            error: 'Analysis Failed',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
