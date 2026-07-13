import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      
      // Extract the combined Markdown text from the response composer
      const systemMessage = { 
        sender: 'system', 
        text: data.reply || "No text payload returned from backend." 
      };
      
      setMessages(prev => [...prev, systemMessage]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        sender: 'system', 
        text: '❌ Connection error. Verify your backend server is active on port 5000.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.topBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🎓</span>
          <div>
            <h1 style={styles.mainTitle}>Academic Assistant AI</h1>
            <p style={styles.subTitle}>Multi-Agent System Hub</p>
          </div>
        </div>
      </div>

      <div style={styles.layoutBody}>
        <div style={styles.chatDisplay}>
          {messages.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🤖</div>
              <h3>Academic Workspace Initialized</h3>
              <p>Try asking compound topics: <br/><em>"Explain arrays and give me a quiz"</em></p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} style={{...styles.messageRow, justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'}}>
                <div style={{
                  ...styles.bubble,
                  backgroundColor: msg.sender === 'user' ? '#0070f3' : '#f1f3f5',
                  color: msg.sender === 'user' ? '#ffffff' : '#212529',
                  borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  border: msg.sender === 'user' ? 'none' : '1px solid #e9ecef'
                }}>
                  <strong style={{ display: 'block', marginBottom: '4px', fontSize: '11px', textTransform: 'uppercase', color: msg.sender === 'user' ? '#cbd5e1' : '#6c757d' }}>
                    {msg.sender === 'user' ? 'You' : 'Academic Agents'}
                  </strong>
                  
                  {/* Render the markdown fields cleanly */}
                  {msg.sender === 'user' ? (
                    <span style={{ fontSize: '15px', whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                  ) : (
                    <div className="markdown-body" style={{ fontSize: '15px', textAlign: 'left' }}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div style={{...styles.messageRow, justifyContent: 'flex-start'}}>
              <div style={styles.loadingPulse}>
                Agents collaborating on response modules...
              </div>
            </div>
          )}
        </div>

        <div style={styles.inputTray}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question or request an academic quiz..."
            style={styles.textInput}
            disabled={isLoading}
          />
          <button onClick={handleSend} style={styles.actionButton} disabled={isLoading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  appContainer: { fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px' },
  topBar: { width: '100%', maxWidth: '850px', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #e9ecef' },
  mainTitle: { margin: 0, fontSize: '26px', color: '#1e293b', fontWeight: '700' },
  subTitle: { margin: '2px 0 0 0', fontSize: '13px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase' },
  layoutBody: { width: '100%', maxWidth: '850px', display: 'flex', flexDirection: 'column', height: '72vh', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', overflow: 'hidden' },
  chatDisplay: { flexGrow: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' },
  emptyState: { margin: 'auto', textAlign: 'center', color: '#94a3b8', lineHeight: '1.5' },
  messageRow: { display: 'flex', width: '100%' },
  bubble: { padding: '14px 20px', maxWidth: '75%', lineHeight: '1.6' },
  loadingPulse: { fontSize: '14px', color: '#64748b', fontStyle: 'italic', padding: '10px 16px', background: '#f8f9fa', borderRadius: '20px' },
  inputTray: { display: 'flex', padding: '20px', borderTop: '1px solid #f1f5f9', gap: '12px' },
  textInput: { flexGrow: 1, padding: '14px 20px', borderRadius: '30px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', backgroundColor: '#f8fafc' },
  actionButton: { padding: '0 28px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' }
};