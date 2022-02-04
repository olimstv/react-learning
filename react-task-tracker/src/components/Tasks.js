import Task from './Task';

const Tasks = ({ tasks, onToggle, onDelete }) => {
    return (
        <>
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </>
    );
};

export default Tasks;
