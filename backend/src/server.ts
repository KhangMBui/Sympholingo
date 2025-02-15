import express from "express";
import cors from "cors";
import { generateMusic } from "./sunoService";

const app = express();
const PORT = 5006;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Automatically test the Suno API when the server starts
  (async () => {
    try {
      const prompt = "Generate a happy tune";
      const model = "latest";
      const music = await generateMusic({ prompt, model });
      console.log("Generated music:", music);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error generating music:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  })();
});
