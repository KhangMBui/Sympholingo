import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend of Sympholingo!" });
});

// Handle user input of the three fields: genre, native language, and learning language

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
