// import React, { useState } from 'react';

// const TaskPage = () => {
//     const [tasks, setTasks] = useState([]);

//     const handleAddTask = (task) => {
//         setTasks([...tasks, task]);
//     };

//     const handleDeleteTask = (id) => {
//         setTasks(tasks.filter((task) => task.id !== id));
//     };

//     return (
//         <div>
//             <h1>Tasks</h1>
//             <TaskForm onAddTask={handleAddTask} />
//             <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
//         </div>
//     );
// };

// const TaskForm = ({ onAddTask }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [dueDate, setDueDate] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const id = new Date().getTime();
//         const task = { id, title, description, dueDate };

//         onAddTask(task);
//         setTitle('');
//         setDescription('');
//         setDueDate('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Title:
//                 <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//             </label>
//             <br />
//             <label>
//                 Description:
//                 <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//             </label>
//             <br />
//             <label>
//                 Due Date:
//                 <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
//             </label>
//             <br />
//             <button type="submit">Add Task</button>
//         </form>
//     );
// };

// const TaskList = ({ tasks, onDeleteTask }) => {
//     return (
//         <ul>
//             {tasks.map((task) => (
//                 <li key={task.id}>
//                     {task.title} ({task.dueDate}){' '}
//                     <button onClick={() => onDeleteTask(task.id)}>Delete</button>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default TaskPage;

import React, { useState } from 'react';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);

    // const handleAddTask = (task) => {
    //     fetch("/api/add-task", {
    //         method: 'POST',
    //         headers: {
    //             Accept: "application/json",
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(task),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setTasks([...tasks, data]);
    //         // console.log("data",data);
    //     })
    //     .catch(error => console.error(error));
    // };
    const handleAddTask = (task) => {
        const dueDateObj = new Date(task.dueDate);
        const taskWithDate = {...task, dueDate: dueDateObj};
        
        fetch("/api/add-task", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskWithDate),
        })
            .then(response => response.json())
            .then(data => {
                setTasks([...tasks, task]);
                console.log(data);
            })
            .catch(error => console.error(error));
    };


    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            <h1>Tasks</h1>
            <TaskForm onAddTask={handleAddTask} />
            <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
        </div>
    );
};

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = new Date().getTime();
        const task = { id, title, description, dueDate };

        onAddTask(task);
        setTitle('');
        setDescription('');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <br />
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <br />
            <label>
                Due Date:
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </label>
            <br />
            <button type="submit">Add Task</button>
        </form>
    );
};

// const TaskList = ({ tasks, onDeleteTask }) => {
    
//     return (
//         <ul>
//             {tasks.map((task) => (
//                 <li key={task.id}>
//                     {task.title} ({task.dueDate}){''}
//                     <button onClick={() => onDeleteTask(task.id)}>Delete</button>
//                 </li>
//             ))}
//         </ul>
//     );
// };
const TaskList = ({ tasks, onDeleteTask }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    {task.title} ({new Date(task.dueDate).toLocaleDateString()}){' '}
                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};


export default TaskPage;


