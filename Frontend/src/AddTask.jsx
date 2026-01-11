import { useState } from 'react'
import API_BASE_URL from './config'

const AddTask = ({ onTaskAdded }) => {

    const [title, setTitle] = useState("");
    const addTask = async () => {
        if (!title.trim()) {
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/tasks/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title })
            });
            if (response.ok) {
                setTitle("");
                onTaskAdded();
            } else {
                alert('Error adding task');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to add task');
        }
    };

    return (
        <div className="add-task-container">
            <div className="input-group">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="task-input"
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button className="add-button" onClick={addTask}>
                    <span>Add Task</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
        </div>
    )
}

export default AddTask
