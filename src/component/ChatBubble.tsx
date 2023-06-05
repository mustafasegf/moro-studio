import React from "react";

interface ChatBubbleProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  sender,
  message,
  isOwnMessage,
}) => {
  return (
    <div className={`chat-bubble ${isOwnMessage ? "own-message" : ""}`}>
      {!isOwnMessage && <div className="sender">{sender}</div>}
      <div className="message">{message}</div>
    </div>
  );
};

export default ChatBubble;
