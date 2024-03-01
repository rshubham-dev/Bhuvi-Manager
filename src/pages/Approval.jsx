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
// import io from 'socket.io-client';
// const socket = io('http://localhost:8080');
axios.defaults.withCredentials = true;

const Approval = () => {
    const [allApprovals, setAllApprovals] = useState([]);
    const [pendingApprovals, setPendingApproval] = useState([]);
    const [approved, setApproved] = useState([]);
    const [rejected, setRejected] = useState([]);
    const { user } = useSelector((state) => {
        return state.auth
    });
    const navigate = useNavigate();
    useEffect(() => {
        // socket.on('message', (incomingData) => {
        //     console.log('Received message:', incomingData);
        //     setAllMessages((prevMessages) => [...prevMessages, { content: incomingData, isUser: false }]);
        // });

        // return () => {
        //     socket.disconnect();
        // };
        if (user) {
            fetchApproval(user._id);
            fetchApproved(user._id);
        }
    }, []);

    const fetchApproval = async (id) => {
        try {
            console.log(id)
            const response = await axios.get(`/api/v1/approval/pending/user/${id}`);
            const approvalData = response.data;
            // const siteData = await axios.get(`/api/v1/site/${response.data?.data.site}`);
            // console.log(siteData.data)
            // approvalData.data.site = siteData.data;
            // if(approvalData?.data.supplier){
            //   const supplierData = await axios.get(`/api/v1/supplier/${approvalData?.data.supplier}`);
            //   approvalData?.data.supplier = supplierData.data;
            // }else if(approvalData?.data.contractor){
            //   const contractorData = await axios.get(`/api/v1/contractor/${approvalData?.data.contractor}`);
            //   approvalData?.data.contractor = contractorData.data;
            // }
            setAllApprovals(approvalData)
            setPendingApproval(approvalData)
            console.log(approvalData)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchApproved = async (id) => {
        try {
            console.log(id)
            const response = await axios.get(`/api/v1/approval/approved/user/${id}`);
            const approvedData = response.data;
            setApproved(approvedData)
            console.log(approvedData)
        } catch (error) {
            console.error(error)
        }
    }

    const handleApprove = async (id) => {
        try {
            console.log(id)
            const response = await axios.put(`/api/v1/approval/${id}`);
            console.log(response.data)
            setPendingApproval(pendingApprovals.filter((pendingApproval) => pendingApproval._id !== id))
        } catch (error) {
            console.error(error)
        }
    };
    const handleReject = () => { };

    const handleDelete = async (id) => {
        try {
            console.log(id)
            const response = await axios.delete(`/api/v1/approval/${id}`);
            setApproved(approved.filter((approved) => approved._id !== id))
        } catch (error) {
            console.error(error)
        }
    };

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
                        {/* <button onClick={reject} className="text-red-500 hover:text-red-700">
                            <LuShieldClose className="inline-block mr-1" />
                            Reject
                        </button> */}
                    </div>
                </div>
            </div>
        );
    };

    const ApprovedCard = ({ workDescription, site, by, date, view, remove }) => {
        return (
            <div className=" px-4 py-6">
                <h2 className="text-xl font-semibold mb-4 uppercase">{workDescription} {site}</h2>
                <div className='flex flex-col gap-2 text-md'>
                    <div className="flex justify-between gap-4 tracking-tight">
                        <div className="text-gray-600">Date:</div>
                        <div className="text-gray-800">{date ? moment(date).format('DD-MM-YYYY') : '-'}</div>
                    </div>
                    <div className="flex justify-between gap-4 tracking-tight">
                        <div className="text-gray-600">Approved By:</div>
                        <div className='text-gray-600'>{by}</div>
                    </div>
                    <div className="flex justify-between gap-4 tracking-tight text-lg mt-2">
                        <button onClick={view} className="text-blue-500 mr-2 hover:text-blue-700">
                            <BiLinkExternal className="inline-block mr-1" />
                            View
                        </button>
                        <button onClick={remove} className="text-red-500 hover:text-red-700">
                            <MdDelete className="inline-block mr-1" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
            <Header category="Page" title="Approval" />
            <section className='h-full w-full overflow-x-auto'>

                <Tabs defaultActiveKey='pending' className='p-2'>

                    <Tabs.TabPane tab='Pending' key={'pending'} className='p-1 h-full'>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {pendingApprovals.map((approval) => (
                                <div key={approval._id} className='bg-gray-50 shadow-md rounded-2xl'>
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
                    </Tabs.TabPane>

                    <Tabs.TabPane tab='Approved' key={'approved'} className='p-1 h-full'>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {approved.map((approved) => (
                                <div key={approved._id} className='bg-gray-50 shadow-md rounded-2xl'>
                                    <ApprovedCard
                                        workDescription=''
                                        site=''
                                        date={approved.date}
                                        by={approved.by?.userName}
                                        view={() => navigate(`/bill-data/${approved?._id}`)}
                                        remove={() => handleDelete(approved?._id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab='Rejected' key={'rejected'} className='p-1 h-full'>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {rejected.map((approval) => (
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
                    </Tabs.TabPane>

                </Tabs>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </section>
        </div>
    )
}

export default Approval