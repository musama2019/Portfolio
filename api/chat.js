// Vercel Serverless Function for AI Chatbot
// This keeps the API key secure on the server side

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { message, portfolioData, systemPrompt } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        // API key is secure on server side - set in environment variables
        const apiKey = process.env.TOGETHER_API_KEY;
        
        if (!apiKey) {
            throw new Error('TOGETHER_API_KEY environment variable not set');
        }
        
        // Call Together AI API from server
        const response = await fetch('https://api.together.xyz/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt || 'You are Muhammad Usama\'s AI assistant. Answer questions about his portfolio professionally.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 500,
                temperature: 0.7,
                top_p: 0.7,
                top_k: 50,
                repetition_penalty: 1,
                stop: ["</s>"],
                stream: false
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Together AI API error:', response.status, errorText);
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid API response structure');
        }
        
        const aiResponse = data.choices[0].message.content.trim();
        
        res.status(200).json({ 
            response: aiResponse,
            success: true 
        });
        
    } catch (error) {
        console.error('Serverless function error:', error);
        
        // Fallback response
        const fallbackResponse = "I'm having a technical issue right now. Please contact Usama directly at musama2019@namal.edu.pk for any questions about his work and experience!";
        
        res.status(200).json({ 
            response: fallbackResponse,
            success: false,
            error: error.message
        });
    }
} 