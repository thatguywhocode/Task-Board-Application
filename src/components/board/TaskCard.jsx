import { useContext, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { BoardContext } from "../../context/BoardContext";

function TaskCard({ task }) {
  const { deleteTask, updateTask } = useContext(BoardContext);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

const { attributes, listeners, setNodeRef, transform, isDragging } =
  useDraggable({
    id: task.id,
  });

const style = {
  transform: transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined,
  opacity: isDragging ? 0 : 1,
  cursor: "grab"
};

  const handleUpdate = () => {
    updateTask({
      ...task,
      title,
      description,
      priority,
      dueDate
    });

    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`task-card priority-${task.priority.toLowerCase()}`}
    >
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
  <div className="task-top">
    <h4 className="task-title">{task.title}</h4>
  </div>

  <p className="task-desc">{task.description}</p>

  <div className="task-footer">
    <span className="task-priority">
      {task.priority}
    </span>

    <span className="task-due">
      {task.dueDate ? `Due: ${task.dueDate}` : "No Due Date"}
    </span>

    <div className="task-actions">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
      >
        Edit
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
      >
        Delete
      </button>
    </div>
  </div>
</>
      )}
    </div>
  );
}

export default TaskCard;
