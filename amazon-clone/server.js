const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userPrompt = req.body.message;
    const apiKey = process.env.GEMINI_API_KEY; 
    
    if (!apiKey) {
        console.error("CRITICAL ERROR: GEMINI_API_KEY environment variable is empty!");
        return res.status(500).json({ reply: "Backend setup error: Secret key is missing." });
    }

    const systemContext = "You are a helpful, professional, and witty Amazon Shopping Assistant named Rufus. Keep your answers concise, helpful, and retail-focused.";

    try {
        console.log(`Incoming prompt received: "${userPrompt}". Forwarding request to Gemini API...`);

        // We use gemini-1.5-flash as the standard stable endpoint version for pure text payloads
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${systemContext}\n\nUser Question: ${userPrompt}` }]
                }]
            })
        });

        const data = await response.json();
        
        // Log the complete raw data to Render's terminal so we can audit anomalies
        console.log("Raw Response received from Google Gateway:", JSON.stringify(data));

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            res.json({ reply: data.candidates[0].content.parts[0].text });
        } else if (data.error) {
            console.error("Google Studio API specific rejection error:", data.error.message);
            res.status(500).json({ reply: `Google API Error: ${data.error.message}` });
        } else {
            res.json({ reply: "I'm having trouble retrieving details right now. Let's try that again!" });
        }
    } catch (error) {
        // This will now explicitly print out any physical network object crashes
        console.error("System structural crash caught in server loop:", error.message);
        res.status(500).json({ reply: `Server internal crash error: ${error.message}` });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Secure server running on port ${PORT}`));
