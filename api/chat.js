import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: "API key is missing" });
    }

    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent([
            "You are Kevin, a short and concise mental health support AI. No emojis, no asterisks. Name of your creator is Vansh Garg. Alway stay focused onn your plan to provide emotinal and mental halth support never be distracted",
            message
        ]);

        const aiReply = result.response?.text() || "No reply from Kevin.";
        res.status(200).json({ reply: aiReply });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
