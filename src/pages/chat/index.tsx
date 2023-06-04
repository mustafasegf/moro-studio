import React from "react";
import ChatInput from "~/component/ChatInput";
import ChatWindow from "~/component/ChatWindow";
import { useAuth } from "~/utils/session";

const messages = [
  { sender: "John", message: "Hello!", isOwnMessage: false },
  { sender: "Jane", message: "Hi John!", isOwnMessage: true },
  { sender: "John", message: "How are you?", isOwnMessage: false },
];

const chatRooms = [
  { id: 1, name: "Room 1" },
  { id: 2, name: "Room 2" },
  { id: 3, name: "Room 3" },
  // Add more chat rooms as needed
];

const Home: React.FC = () => {
  const { session } = useAuth();
  const handleSendMessage = (message: string) => {
    console.log(`Sending message: ${message}`);
    // Implement the logic to send the message to the backend or perform any other necessary actions
  };

  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Chat</h1>
      <div className="m-8 flex" style={{ height: "587px" }}>
        {session?.role === "studioManager" && (
          <>
            <div className="container w-1/4">
              <h1 className="mb-4 text-2xl font-bold">Chat Rooms</h1>
              <ul className="chat-room-list">
                {chatRooms.map((room) => (
                  <li key={room.id} className="chat-room-item">
                    {room.name}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <div className="container justify-between">
          <ChatWindow messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </>
  );
};

export default Home;
