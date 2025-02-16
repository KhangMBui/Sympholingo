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
      text: `🎵 Genre: ${genre}\n🌍 Native: ${nativeLanguage}\n📝 Learning: ${learningLanguage}`,
    };
    setMessages((prev) => [...prev, userMessage]);

    const requestData = { genre, nativeLanguage, learningLanguage };

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to the server.");
      }

      const data = await response.json();

      let botMessage = { sender: "bot", text: "" };
      setMessages((prev) => [...prev, botMessage]);

      const fullMessage = data.message;
      let currentText = "";

      fullMessage.split("").forEach((char: string, index: number) => {
        setTimeout(() => {
          currentText += char;
          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              sender: "bot",
              text: currentText,
            };
            return updatedMessages;
          });

          if (index === fullMessage.length - 1) {
            setIsTyping(false);
          }
        }, 20 * index);
      });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending data.");
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
          {isTyping ? "Typing..." : "Send"}
        </button>
        <button
          className="sidebar-button clear-button"
          onClick={handleClearChat}
          disabled={isTyping}
        >
          Clear Chat
        </button>
      </div>

      <div className="main-content">
        <div className="header">
          <h1 className="app-title">Sympholingo</h1>
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
          {isTyping && <div className="typing-indicator">Bot is typing...</div>}
        </div>
      </div>
    </div>
  );
}

export default App;