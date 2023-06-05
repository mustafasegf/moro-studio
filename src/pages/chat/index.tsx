import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import React, { useState } from "react";
import ChatInput from "~/component/ChatInput";
import ChatWindow from "~/component/ChatWindow";
import { api } from "~/utils/api";
import { useAuth } from "~/utils/session";

const Chat: React.FC = () => {
  const { session } = useAuth();
  const chatRoomQuery = api.chat.getChatRooms.useQuery();
  const chatRooms = chatRoomQuery.data || [];

  const [selectedChatRoom, setSelectedChatRoom] = useState(chatRooms[0]);
  const [messages, setMessages] = useState<
    {
      sender: string;
      message: string;
      isOwnMessage: boolean;
    }[]
  >([]);

  const createChat = api.chat.createChat.useMutation();
  const createChatRoom = api.chat.createChatRoom.useMutation();

  const handleSendMessage = async (message: string) => {
    console.log(`Sending message: ${message}`);

    if (!selectedChatRoom) {
      if (session?.role === "studioManager") {
        alert("Please select a chat room first.");
      }
    }

    if (selectedChatRoom) {
      const response = await createChat.mutateAsync({
        chatRoomId: selectedChatRoom?.id,
        chat: message,
        staffSend: session?.role === "studioManager",
      });

      const newMessage = {
        sender: session?.role === "studioManager" ? "Staff" : "User",
        message: response.chat,
        isOwnMessage: true,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  function handleSelectChatRoom(chatRoomId: string) {
    setSelectedChatRoom(chatRooms.find((room) => room.id === chatRoomId));
    const messages = generateMessages(chatRoomId);
    setMessages(messages);
    console.log(`Selected chat room: ${chatRoomId}`);
  }

  function generateMessages(chatRoomId: string) {
    const messages: {
      sender: string;
      message: string;
      isOwnMessage: boolean;
    }[] = [];
    const room = chatRooms.find((room) => room.id === chatRoomId);
    if (room) {
      room.chat.forEach((chat) => {
        messages.push({
          sender: session?.role === "studioManager" ? "Staff" : "User",
          message: chat.chat,
          isOwnMessage:
            session?.role === "studioManager"
              ? chat.staffSend
              : !chat.staffSend,
        });
      });
    }

    return messages;
  }

  function handleCreateChatRoom() {
    createChatRoom.mutate();
    chatRoomQuery.refetch();
    if (chatRoomQuery.data) {
      setSelectedChatRoom(chatRoomQuery.data[0]);
    }
  }

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
                  <div
                    key={room.id}
                    className={`cursor-pointer rounded-md p-1 hover:bg-grey ${
                      selectedChatRoom?.id === room.id ? "bg-grey" : ""
                    }`}
                    onClick={() => handleSelectChatRoom(room.id)}
                  >
                    <li className="chat-room-item">
                      {format(room.updatedAt, "hh:mm:ss aa", {
                        locale: enUS,
                      })}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </>
        )}

        <div className="container justify-between">
          <ChatWindow messages={messages} />
          {session?.role !== "studioManager" && !selectedChatRoom && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white rounded py-2 px-4 font-bold"
              onClick={handleCreateChatRoom}
            >
              Buat Chat Room
            </button>
          )}
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </>
  );
};

export default Chat;
