import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

// "tasks": [
//   {
//       "id": 1,
//       "text": "Doctors Appointment",
//       "day": "Feb 5th at 2:30pm",
//       "reminder": true
//   },
//   {
//       "id": 2,
//       "text": "Meeting at School",
//       "day": "Feb 6th at 1:30pm",
//       "reminder": true
//   }
// ]

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };

        getTasks();
    }, []);

    // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        const data = await res.json();

        return data;
    };

    // Fetch Task
    const fetchTask = async id => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();

        return data;
    };

    // Add Task
    const addTask = async task => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const data = await res.json();
        console.log('data:', data);

        setTasks([...tasks, data]);

        // console.log(task);
        // const newId = Math.floor(Math.random() * 1000) + 1;
        // const newTask = { ...task, id: newId };
        // setTasks([...tasks, newTask]);
    };
    // Delete Task
    const deleteTask = async id => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        });

        setTasks(tasks.filter(task => task.id !== id));
    };
    // Toggle Reminder
    const toggleReminder = async id => {
        const taskToToggle = await fetchTask(id);
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        });

        const data = await res.json();
        console.log('data:', data);

        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        );
    };

    return (
        <Router>
            <div className='container'>
                <Header
                    title='Task Tracker'
                    onAdding={() => setShowAddTask(!showAddTask)}
                    showAddTask={showAddTask}
                />

                <Routes>
                    <Route
                        path='/'
                        element={
                            <>
                                {showAddTask && <AddTask onAdd={addTask} />}
                                {tasks.length > 0 ? (
                                    <Tasks
                                        tasks={tasks}
                                        onToggle={toggleReminder}
                                        onDelete={deleteTask}
                                    />
                                ) : (
                                    'No Tasks To Show'
                                )}
                            </>
                        }
                    />
                    <Route path='/about' element={<About />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
