import express from "express";
import cors from "cors";
import { generateMusic } from "./sunoService";
import chatRoutes from "./routes/chatRoutes";
import { translateAndAnnotateLyrics } from "./openAI/openaiService";

const app = express();
const PORT = process.env.PORT || 1050;

app.use(cors());
app.use(express.json());
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend of Sympholingo!" });
});


app.get("/test-generate-music", async (req, res) => {
  try {
    const prompt = "Generate a happy tune";
    const model = "latest";
    const music = await generateMusic({ prompt, model });
    res.json(music);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// Handle user input of the three fields: genre, native language, and learning language
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Automatically test the Suno API when the server starts
  (async () => {
    try {
      const prompt = "Generate a happy tune";
      const model = "latest";
      const music = await generateMusic({ prompt, model });
      console.log("Generated music:", music);

      // Once we generaged the music. Let's make have the lyrics translation
      // line by line by line.
      const targetLang = "vi";
      console.log(music.text);
      const result = await translateAndAnnotateLyrics(music.text, targetLang);
      console.log("Translation", result)
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error generating music:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  })();
});
