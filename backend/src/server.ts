import express from "express";
import cors from "cors";
import { generateMusic } from "./sunoService";
import axios from "axios";
import chatRoutes from "./routes/chatRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend of Sympholingo!" });
});

app.post("/generate-music", async (req, res) => {
  try {
    const { genre, nativeLanguage, learningLanguage } = req.body;

    if (!genre || !nativeLanguage || !learningLanguage) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    console.log("Received request:", req.body);

    // Step 1: Generate Lyrics
    const musicPrompt = `Generate a ${genre} song in ${learningLanguage}.`;
    console.log("🎶 Generating lyrics with prompt:", musicPrompt);

    const data = await generateMusic({
      prompt: musicPrompt,
      model: "latest",
      wait_audio: true,
    });

    if (!data || !data.lyric) {
      throw new Error("Failed to generate lyrics.");
    }

    console.log("Lyrics generated successfully!");

    if (!data.audio_url) {
      throw new Error("Failed to generate audio url.");
    }

    console.log("Audio generated successfully!");

    // Step 3: Return both lyrics and audio
    res.json({
      lyrics: data.lyric,
      audioUrl: data.audio_url,
    });
  } catch (error) {
    console.error("Error generating music:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

// Handle user input of the three fields: genre, native language, and learning language
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
