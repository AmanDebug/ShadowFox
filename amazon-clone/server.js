const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows your GitHub Pages site to talk to this server
app.use(express.json());

// This endpoint receives the user message from your frontend
app.post('/api/chat', async (req, res) => {
    const userPrompt = req.body.message;
    
    // Grabs your secret key securely from the server environment variables
    const apiKey = process.env.GEMINI_API_KEY; 
    
    if (!apiKey) {
        return res.status(500).json({ error: "Backend configuration error: API Key missing." });
    }

    const systemContext = "You are a helpful, professional, and witty Amazon Shopping Assistant named Rufus. Keep your answers concise, helpful, and retail-focused.";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${systemContext}\n\nUser Question: ${userPrompt}` }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            res.json({ reply: data.candidates[0].content.parts[0].text });
        } else {
            res.json({ reply: "I'm having trouble retrieving details right now. Let's try that again!" });
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ reply: "Connection timeout. Please try again." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Secure server running on port ${PORT}`));