const express = require('express');
const router = express.Router();
const detectAgents = require('../utils/agentRouter');

const handleStudyRequest = require('../agents/studyAgent');
const handleQaRequest = require('../agents/qaAgent');
const handleQuizRequest = require('../agents/quizAgent');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- WEEK 5: CONVERSATION HISTORY FEATURE MATRIX ---
let conversationHistory = [];

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        const agentsUsed = detectAgents(message);
        
        let combinedMarkdownResponse = "";

        if (agentsUsed.includes('qa')) {
            const qaResult = await handleQaRequest(message);
            combinedMarkdownResponse += `### 📚 Q&A Agent Analysis\n${qaResult}\n\n---\n\n`;
            await delay(3000);
        }
        
        if (agentsUsed.includes('quiz')) {
            const quizResult = await handleQuizRequest(message);
            combinedMarkdownResponse += `### 🧠 Quiz Agent Assessment\n${quizResult}\n\n---\n\n`;
            await delay(3000);
        }
        
        if (agentsUsed.includes('study') || combinedMarkdownResponse === "") {
            const studyResult = await handleStudyRequest(message);
            combinedMarkdownResponse += `### 📖 Core Study Material\n${studyResult}\n\n`;
        }

        const finalReply = combinedMarkdownResponse.trim();

        // Save to history array to explicitly fulfill Week 5 Task 5
        conversationHistory.push({
            question: message,
            answer: finalReply
        });

        res.json({
            userMessage: message,
            agentsUsed: agentsUsed,
            reply: finalReply,
            historyLog: conversationHistory // Returns complete array trace back to console
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Orchestrator encountered a pipeline breakdown." });
    }
});

// Endpoint for historical audit matching the architecture design
router.get('/history', (req, res) => {
    res.json(conversationHistory);
});

module.exports = router;