import React, { useState, useEffect } from 'react';
import CreateTask from '../components/CreateTask.jsx';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
// import io from 'socket.io-client';
import axios from 'axios';
// const socket = io('http://localhost:8080');

const Task = () => {
    const [tasks, setTask] = useState([]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const todos = await axios.get('/api/v1/todo')
                console.log('res', todos.data)
                setTask(todos.data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchTask();

        // socket.on('task', (todo) => {
        //     console.log('Received message:', todo);
        //     // setTask(todo);
        // });

        // return () => {
        //     socket.disconnect();
        // };
    }, []);

    console.log(tasks)

    return (
        <>
            <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
                <Header category="Page" title="Dashboard" />
                <CreateTask />
                <div className="flex-grow overflow-auto">
                    {tasks.map((task) => (
                        <div key={task._id} className='bg-blue-500  flex gap-4 justify-start items-start m-4'>
                            <div className='text-white p-2 rounded max-w-xs break-words'>
                                {task.task}
                            </div>
                            <div className='text-white p-2 rounded max-w-xs break-words'>
                                {task.completeBy}
                            </div>
                            <div className='text-white p-2 rounded max-w-xs break-words'>
                                {task.completed}
                            </div>
                            <div className='text-white p-2 rounded max-w-xs break-words'>
                                {task.status}
                            </div>
                        </div>
                    ))}
                </div>
                <Toaster position="top-right" reverseOrder={false} />
            </div>
        </>
    )
}

export default Task;