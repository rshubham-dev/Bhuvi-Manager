import React, { useState, useRef, useEffect } from 'react';
import { Tabs } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
// import io from 'socket.io-client';
// const socket = io('http://localhost:8080');

const Message = () => {
    const [allMessages, setAllMessages] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        // socket.on('message', (incomingData) => {
        //     console.log('Received message:', incomingData);
        //     setAllMessages((prevMessages) => [...prevMessages, { content: incomingData, isUser: false }]);
        // });

        // return () => {
        //     socket.disconnect();
        // };
    }, []);


    const sendMessage = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (userMessage !== '') {
            // socket.emit('message', userMessage);
            setAllMessages((prevMessages) => [...prevMessages, { content: userMessage, isUser: true }]);
            inputRef.current.value = '';
        }
    };

    return (
        <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
            <Header category="Page" title="Dashboard" />

            <section className='bg-white px-12 py-6 mb-16 h-full w-full'>
                {/* <form onSubmit={sendMessage} className="w-3/4 flex mx-auto px-8 pt-6 pb-8">
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
                        </form> */}

                <Tabs defaultActiveKey='notification'>

                    <Tabs.TabPane tab='Notification' key={'notification'}>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab='Approval' key={'approval'}>
                        <div className="flex-grow overflow-auto">
                            {allMessages.map((message, index) => (
                                <div key={index} className={`flex justify-${message.isUser ? 'end' : 'start'} items-${message.isUser ? 'end' : 'start'} m-4`}>
                                    <div className={`bg-${message.isUser ? 'green' : 'blue'}-500 text-white p-2 rounded max-w-xs break-words`}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tabs.TabPane>



                </Tabs>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </section>
        </div>
    );
};

export default Message;
