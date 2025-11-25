import React, { useState } from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
    todo: Todo;
    toggleComplete: (id: string) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing && editText.trim() !== '') {
            editTask(todo.id, editText);
        }
        setIsEditing(!isEditing);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleEdit();
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
            />

            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="edit-input"
                />
            ) : (
                <span className="todo-text" onClick={() => toggleComplete(todo.id)}>
                    {todo.text}
                </span>
            )}

            <div className="actions">
                <button onClick={handleEdit} className="edit-btn">
                    {isEditing ? '💾' : '✏️'}
                </button>
                <button onClick={() => deleteTask(todo.id)} className="delete-btn">
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
