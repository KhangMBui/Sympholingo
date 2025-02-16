import { Request, Response } from "express";

const handleChat = (req: Request, res: Response): void => {
  console.log("📩 Received request body:", req.body);
  const { genre, nativeLanguage, learningLanguage } = req.body;

  // Provide default values if any fields are missing
  const safeGenre = genre || "Rock";
  const safeNativeLanguage = nativeLanguage || "English";
  const safeLearningLanguage = learningLanguage || "Spanish";

  // Generate a chatbot-like response
  const botResponse = `🎶 You chose ${safeGenre} music to learn ${safeLearningLanguage}! Since your native language is ${safeNativeLanguage}, I'll find some great ${safeGenre} songs with ${safeLearningLanguage} lyrics for you!`;

  // Generate a descriptive prompt for music generation
  const musicPrompt = `Create a ${safeGenre} song with lyrics in ${safeLearningLanguage}.`;

  console.log("🎤 Chat generated prompt:", musicPrompt);

  res.json({ message: botResponse, prompt: musicPrompt });
};

export default handleChat;
