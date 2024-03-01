import React, { useState, useRef, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import moment from 'moment';
import { FcApproval } from "react-icons/fc";
import { BiLinkExternal } from "react-icons/bi";
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { LuShieldClose } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
axios.defaults.withCredentials = true;

const Message = () => {
    const socket = io('http://localhost:8080');
    const [messages, setMessage] = useState([]);
    const { user } = useSelector((state) => { return state.auth });
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('notification', (message) => {
            console.log('Received message:', message);
            setMessage(message);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    // const sendMessage = (e) => {
    //     e.preventDefault();
    //     const userMessage = inputRef.current.value.trim();
    //     if (userMessage !== '') {
    //         // socket.emit('message', userMessage);
    //         setAllMessages((prevMessages) => [...prevMessages, { content: userMessage, isUser: true }]);
    //         inputRef.current.value = '';
    //     }
    // };

    const ApprovalCard = ({ workDescription, site, by, date, view, approve, reject }) => {
        return (
            <div className=" px-4 py-6">
                <h2 className="text-xl font-semibold mb-4 uppercase">{workDescription} {site}</h2>
                <div className='flex flex-col gap-2 text-md'>
                    <div className="flex justify-between gap-4 tracking-tight">
                        <div className="text-gray-600">Date:</div>
                        <div className="text-gray-800">{date ? moment(date).format('DD-MM-YYYY') : '-'}</div>
                    </div>
                    <div className="flex justify-between gap-4 tracking-tight">
                        <div className="text-gray-600">Created By:</div>
                        <div className='text-gray-600'>{by}</div>
                    </div>
                    <div className="flex justify-between gap-4 tracking-tight text-lg mt-2">
                        <button onClick={view} className="text-blue-500 mr-2 hover:text-blue-700">
                            <BiLinkExternal className="inline-block mr-1" />
                            View
                        </button>
                        <button onClick={approve} className="text-green-500 hover:text-green-700 mr-2">
                            <FcApproval className="inline-block mr-1" />
                            Approve
                        </button>
                        <button onClick={reject} className="text-red-500 hover:text-red-700">
                            <LuShieldClose className="inline-block mr-1" />
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
            <Header category="Page" title="Message" />
            <section className='h-full w-full overflow-x-auto'>
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

                {/* <Tabs defaultActiveKey='approval' className='p-2'>
                    <Tabs.TabPane tab='Notification' key={'notification'}> */}
                <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {messages.map((message, index) => (
                        <div key={index} className='bg-gray-50 shadow-lg rounded-2xl'>
                            {message}
                        </div>
                    ))}
                </div>
                {/* </Tabs.TabPane> */}

                {/* <Tabs.TabPane tab='Pending' key={'approval'} className='p-1 h-full'>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {allMessages.map((approval) => (
                                <div key={approval._id} className='bg-gray-50 shadow-lg rounded-2xl'>
                                    <ApprovalCard
                                        workDescription={approval.approvalOf}
                                        site=''
                                        date={approval.date}
                                        by={approval.by?.userName}
                                        view={() => navigate(`/bill-data/${approval?._id}`)}
                                        approve={() => handleApprove(approval?._id)}
                                        reject={() => handleReject(approval?._id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </Tabs.TabPane> */}

                {/* </Tabs> */}

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </section>
        </div>
    );
};

export default Message;
