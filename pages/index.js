import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    setMessages([...messages, { type: "user", content: message }]);
    setMessage("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
      });
      if (response.ok) {
        const { reply } = await response.json();
        setMessages([...messages, { type: "user", content: message }, { type: "chatgpt", content: reply }]);
      } else {
        console.error("An error occurred while sending the message");
      }
    };
   
    return (
      <div>
        <h1>ChatGPT: Soothing Conversations</h1>
        <div>
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.type === "user" ? "userMessage" : "chatgptMessage"}>
              {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
}   