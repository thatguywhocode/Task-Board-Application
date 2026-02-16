import { useState, useContext } from "react";
import { BoardContext } from "../../context/BoardContext";

function TaskForm() {
    const { addTask } = useContext(BoardContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("Title is required");
        return;
}

addTask({
    title,
    description,
    priority,
    dueDate,
    tags: tags.split(",").map(tag => tag.trim())
});

setTitle("");
setDescription("");
setPriority("Low");
setDueDate("");
setTags("");
setError("");
};

return (
    <div className="task-form">
        <h3>Create Task</h3>
        
        <form onSubmit={handleSubmit}> 
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /> 

            {error && <p className="error">{error}</p>}

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="" disabled>Priority Level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            <button type="submit">Add Task</button>
        </form>
    </div>
);
}

export default TaskForm;