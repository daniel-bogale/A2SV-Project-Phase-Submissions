import React from 'react';
import type { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    toggleComplete: (id: string) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, deleteTask, editTask }) => {
    if (todos.length === 0) {
        return <div className="empty-state">No tasks yet! Add one above.</div>;
    }

    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                    editTask={editTask}
                />
            ))}
        </div>
    );
};

export default TodoList;
