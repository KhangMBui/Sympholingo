import "./App.css";
import { useState } from "react";

function App() {
  const [genre, setGenre] = useState<string>("");
  const [nativeLanguage, setNativeLanguage] = useState<string>("");
  const [learningLanguage, setLearningLanguage] = useState<string>("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  const handleSubmit = async () => {
    if (!genre || !nativeLanguage || !learningLanguage) {
      alert("Please fill out all fields.");
      return;
    }

    // Create user message object
    const userMessage = {
      sender: "user",
      text: `🎵 Genre: ${genre}\n🌍 Native: ${nativeLanguage}\n📝 Learning: ${learningLanguage}`,
    };

    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Prepare the data to send to backend
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

      // Typing effect logic
      const botMessage = { sender: "bot", text: "" };
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Add empty message first

      const fullMessage = data.message;
      let currentText = "";

      fullMessage.split("").forEach((char, index) => {
        setTimeout(() => {
          currentText += char;
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = {
              sender: "bot",
              text: currentText,
            };
            return updatedMessages;
          });
        }, 30 * index); // Adjust the speed here (30ms per character)
      });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending data.");
    }

    // Clear input fields after submission
    setGenre("");
    setNativeLanguage("");
    setLearningLanguage("");
  };

  return (
    <div className="app">
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
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Enter a genre of music"
          className="chat-input-field"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your native language"
          className="chat-input-field"
          value={nativeLanguage}
          onChange={(e) => setNativeLanguage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the language you want to learn"
          className="chat-input-field"
          value={learningLanguage}
          onChange={(e) => setLearningLanguage(e.target.value)}
        />
        <button className="chat-send" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
