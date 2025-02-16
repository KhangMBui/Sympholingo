import express from "express";
import cors from "cors";
import { generateMusic } from "./sunoService";
import chatRoutes from "./routes/chatRoutes";
import { translateAndAnnotateLyrics } from "./openAI/openaiService";

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
    const lyricsPrompt = `Generate a ${genre} song in ${learningLanguage}.`;
    console.log("🎶 Generating lyrics with prompt:", lyricsPrompt);

    const lyrics = await generateMusic({
      prompt: lyricsPrompt,
      model: "latest",
    });

    if (!lyrics || !lyrics.text) {
      throw new Error("Failed to generate lyrics.");
    }
    console.log("📜 Lyrics generated successfully!");

    // Step 2: Translate and Annotate Lyrics
    console.log("🌍 Translating lyrics...");
    const translatedLyrics = await translateAndAnnotateLyrics(
      lyrics.text,
      nativeLanguage
    );
    console.log("✅ Translation completed!");

    res.json({
      lyrics: lyrics.text,
      translatedLyrics,
    });
  } catch (error) {
    console.error("Error generating music:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // (async () => {
  //   try {
  //     const prompt = "Generate a happy tune";
  //     const model = "latest";
  //     const music = await generateMusic({ prompt, model });
  //     console.log("Generated music:", music);

  //     // Once we generaged the music. Let's make have the lyrics translation
  //     // line by line by line.
  //     const targetLang = "vi";
  //     console.log(music.text);
  //     const result = await translateAndAnnotateLyrics(music.text, targetLang);
  //     console.log("Translation", result);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("Error generating music:", error.message);
  //     } else {
  //       console.error("An unknown error occurred");
  //     }
  //   }
  // })();
});
