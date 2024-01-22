import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:8080'); // Replace with your Socket.IO server URL

const Message = () => {
    const [allMessages, setAllMessages] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        socket.on('message', (incomingData) => {
            console.log('Received message:', incomingData);
            setAllMessages((prevMessages) => [...prevMessages, { content: incomingData, isUser: false }]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    const sendMessage = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (userMessage !== '') {
            socket.emit('message', userMessage);
            setAllMessages((prevMessages) => [...prevMessages, { content: userMessage, isUser: true }]);
            inputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow overflow-auto">
                {allMessages.map((message, index) => (
                    <div key={index} className={`flex justify-${message.isUser ? 'end' : 'start'} items-${message.isUser ? 'end' : 'start'} m-4`}>
                        <div className={`bg-${message.isUser ? 'green' : 'blue'}-500 text-white p-2 rounded max-w-xs break-words`}>
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="bottom-0 w-3/4 flex mx-auto px-8 pt-6 pb-8 mb-14">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Write Your Message"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    type="submit"
                    className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Message;
