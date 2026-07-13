const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function quizAgent(message) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `You are an academic testing assistant. Generate a 5-question Multiple Choice Quiz (MCQ) complete with options (A, B, C, D) and an answer key at the bottom based on this topic: ${message}`,
        });
        return response.text || "";
    } catch (error) {
        return `⚠️ Quiz Agent Error: ${error.message}`;
    }
}
module.exports = quizAgent;