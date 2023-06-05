import React from "react";
import ChatBubble from "./ChatBubble";

interface ChatWindowProps {
  messages: { sender: string; message: string; isOwnMessage: boolean }[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="overflow-y-auto">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            sender={msg.sender}
            message={msg.message}
            isOwnMessage={msg.isOwnMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
