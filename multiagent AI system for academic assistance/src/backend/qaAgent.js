const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function questionAnsweringAgent(message) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `You are an expert Q&A academic agent. Provide a direct, highly clear definition or short answer for the following question: ${message}`,
        });
        return response.text || "";
    } catch (error) {
        return `⚠️ Q&A Agent Error: ${error.message}`;
    }
}
module.exports = questionAnsweringAgent;