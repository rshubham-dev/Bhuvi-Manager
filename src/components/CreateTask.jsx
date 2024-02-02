import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const CreateTask = ({ socket }) => {
    const [task, setTask] = useState({
        task: '',
        to: '',
        completeBy: '',
        remindAt: '',
        remindTime: '',
        remindGap: '',
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const user = await axios.get('/api/v1/user/lists');
                const userData = user.data?.filter((user) => user.role !== 'Client' && user.role !== 'Supplier');
                setUsers(userData);
            } catch (error) {
                toast.error(error.message);
            }
        }
        getUsers();

        // return () => {
        //     socket.disconnect();
        // };
    }, []);

    const handleChange = (field, value) => {
        setTask((prevTask) => ({
            ...prevTask,
            [field]: value,
        }))
    }


    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/todo', task)
            // socket.emit('task', task);
            toast.success(response.data.message)
            console.log(response.data);
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    };

    return (
        <>
            <form
                onSubmit={sendMessage}
                className="w-full flex gap-4 mx-auto px-8 bg-white py-4 rounded-md shadow-md ">

                    <input
                        type="text"
                        value={task.task}
                        onChange={(e) => handleChange('task', e.target.value)}
                        placeholder="Enter Task Here..."
                        className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                {/* <DateTimePicker
                    value={task.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    minDate={new Date()}
                    dayPlaceholder='DD'
                    monthPlaceholder='MM'
                    yearPlaceholder='YYYY'
                    className="shadow appearance-none border w-2/4 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    /> */}


                    <label className="text-sm font-medium text-gray-600">
                        Completeing Date:
                    </label>
                    <input
                        type="date"
                        value={task.completeBy}
                        onChange={(e) => handleChange('completeBy', e.target.value)}
                        className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />



                    <label className="text-sm font-medium text-gray-600">
                        Remind From:
                    </label>
                    <input
                        type="date"
                        value={task.remindAt}
                        onChange={(e) => handleChange('remindAt', e.target.value)}
                        className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <input
                        type="number"
                        placeholder='How Many Time To Remind'
                        value={task.remindTime}
                        onChange={(e) => handleChange('remindTime', e.target.value)}
                        className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <input
                        type="number"
                        placeholder='Remind Gap'
                        value={task.remindGap}
                        onChange={(e) => handleChange('remindGap', e.target.value)}
                        className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <select
                        value={task.to}
                        onChange={(e) => handleChange('to', e.target.value)}
                        className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value=''>Assign Task to</option>
                        {users?.map((user) => (
                            <option key={user._id} value={user._id}>{user.userName}</option>
                        ))}
                    </select>


                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                        Send
                    </button>
                </div>
            </form>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    );
};

export default CreateTask;
