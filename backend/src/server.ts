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

app.post("/test-generate-music", async (req, res) => {
  try {
    // Step 1: Get user input from frontend
    const { genre, nativeLanguage, learningLanguage } = req.body;

    if (!genre || !nativeLanguage || !learningLanguage) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    console.log("📩 Received request body:", req.body);

    // Step 2: Construct the music generation prompt
    const prompt = `Generate a ${genre} song in ${learningLanguage}.`;

    console.log("🎶 Using generated prompt:", prompt);

    // Step 3: Call the Suno music generation service with the constructed prompt
    const model = "latest";
    const music = await generateMusic({ prompt, model });

    console.log("🎼 Music generated successfully!");

    // Step 4: Return the generated music
    res.json(music);
    
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error generating music:", error.message);
      res
        .status(500)
        .json({ error: error.message || "An unknown error occurred" });
    } else {
      console.error("❌ Error generating music:", error);
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// Handle user input of the three fields: genre, native language, and learning language
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // (async () => {
  //   try {
  //     const prompt = "Generate a happy tune";
  //     const model = "latest";
  //     const music = await generateMusic({ prompt, model });
  //     console.log("Generated music:", music);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("Error generating music:", error.message);
  //     } else {
  //       console.error("An unknown error occurred");
  //     }
  //   }
  // })();
});
