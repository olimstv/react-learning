import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState } from 'react';

function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true
        },
        {
            id: 2,
            text: 'Meeting at School',
            day: 'Feb 6th at 1:30pm',
            reminder: true
        }
    ]);

    const [showAddTask, setShowAddTask] = useState(false);

    // Add Task
    const addTask = task => {
        console.log(task);
        const newId = Math.floor(Math.random() * 1000) + 1;
        const newTask = { ...task, id: newId };

        setTasks([...tasks, newTask]);
    };
    // Delete Task
    const deleteTask = id => {
        // console.log(id);

        setTasks(tasks.filter(task => task.id !== id));
    };
    // Toggle Reminder
    const toggleReminder = id => {
        // console.log(id);

        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, reminder: !task.reminder } : task
            )
        );
    };

    return (
        <div className='container'>
            <Header
                title='Task Tracker'
                onAdding={() => setShowAddTask(!showAddTask)}
                showAddTask={showAddTask}
            />
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
        </div>
    );
}

export default App;
