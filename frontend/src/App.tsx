import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    () => {
      const savedMessages = localStorage.getItem("chatMessages");
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
  );

  const [genre, setGenre] = useState<string>("");
  const [nativeLanguage, setNativeLanguage] = useState<string>("");
  const [learningLanguage, setLearningLanguage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async () => {
    if (!genre || !nativeLanguage || !learningLanguage) {
      alert("Please fill out all fields.");
      return;
    }

    setIsTyping(true);

    const userMessage = {
      sender: "user",
      text: `🔴 Genre: ${genre}\n🟢 Native: ${nativeLanguage}\n🔵 Learning: ${learningLanguage}`,
    };
    setMessages((prev) => [...prev, userMessage]);

    const requestData = { genre, nativeLanguage, learningLanguage };

    try {
      const response = await fetch(
        "http://localhost:5000/test-generate-music",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate music.");
      }

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: "🎶 Music generated successfully!",
      };

      const musicMessage = {
        sender: "bot",
        text: data.text, // Extracting only the text from the response
      };

      setMessages((prev) => [...prev, botMessage, musicMessage]);

      console.log("Generated Music Data kakaka:", data); // Handle the music response properly

      setIsTyping(false);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating music.");
      setIsTyping(false);
    }

    setGenre("");
    setNativeLanguage("");
    setLearningLanguage("");
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat?")) {
      setMessages([]);
      localStorage.removeItem("chatMessages");
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <img src="/src/assets/SympholingoLogo.png" alt="Sympholingo Logo" className="logo" />
        <h1 className="app-title">
          <span className="sympho">Sympho</span>
          <span className="lingo">lingo</span>
        </h1>
        <div className="sidebar-content">
          <input
            type="text"
            placeholder="Enter a genre of music"
            className="sidebar-input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your native language"
            className="sidebar-input"
            value={nativeLanguage}
            onChange={(e) => setNativeLanguage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter the language you want to learn"
            className="sidebar-input"
            value={learningLanguage}
            onChange={(e) => setLearningLanguage(e.target.value)}
          />
          <button
            className="sidebar-button"
            onClick={handleSubmit}
            disabled={isTyping}
          >
            {isTyping ? "Generating..." : "Generate Music"}
          </button>
          <button
            className="sidebar-button clear-button"
            onClick={handleClearChat}
            disabled={isTyping}
          >
            Clear Chat
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h2 className="app-description">
            Learn languages through the harmony of music.
          </h2>
        </div>
        <div className="chat-content">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-container ${
                msg.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
          {isTyping && <div className="typing-indicator">Bot is Generating...</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
