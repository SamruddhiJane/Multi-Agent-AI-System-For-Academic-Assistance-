function detectAgents(message) {
    const text = message.toLowerCase();
    const agents = [];

    if (text.includes('quiz') || text.includes('mcq') || text.includes('question') || text.includes('test')) {
        agents.push('quiz');
    }
    if (text.includes('what') || text.includes('why') || text.includes('define') || text.includes('explain') || text.includes('how')) {
        agents.push('qa');
    }
    if (agents.length === 0) {
        agents.push('study');
    }
    return agents;
}
module.exports = detectAgents;