const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function handleStudyRequest(message) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `You are an expert academic tutor agent. Provide a clear, comprehensive educational explanation for the following user topic: ${message}`,
        });
        return response.text || "";
    } catch (error) {
        return `⚠️ Study Agent Error: ${error.message}`;
    }
}
module.exports = handleStudyRequest;