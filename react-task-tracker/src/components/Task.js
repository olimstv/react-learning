import { FaTimes } from 'react-icons/fa';

const Task = ({ task, onToggle, onDelete }) => {
    return (
        <div
            className={`task ${task.reminder && 'reminder'}`}
            onDoubleClick={() => onToggle(task.id)}
        >
            <h3>
                {task.text}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
            <p></p>
        </div>
    );
};

export default Task;
