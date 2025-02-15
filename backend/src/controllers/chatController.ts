import { Request, Response } from "express";

const handleChat = (req: Request, res: Response): void => {
  console.log("📩 Received request body:", req.body);
  const { genre, nativeLanguage, learningLanguage } = req.body;

  if (!genre || !nativeLanguage || !learningLanguage) {
    res.status(400).json({ message: "Please fill in all fields." });
    return;
  }

  // res.json({
  //   message: `Received: Genre - ${genre}, Native Language - ${nativeLanguage}, Learning Language - ${learningLanguage}`,
  // });

  // Generate a chatbot-like response
  const botResponse = `🎶 You chose ${genre} music to learn ${learningLanguage}! Since your native language is ${nativeLanguage}, I'll find some great ${genre} songs with ${learningLanguage} lyrics for you!`;

  // Send response back to frontend
  res.json({ message: botResponse });
};

export default handleChat;
