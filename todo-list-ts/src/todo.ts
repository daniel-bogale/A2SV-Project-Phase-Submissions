// Define the interface for a To-Do item
interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}

// Store tasks in an array
let todoList: TodoItem[] = [];

// Helper to generate unique IDs
let currentId = 1;

/**
 * Adds a new task to the list.
 * @param title The title of the task to add.
 */
function addTodo(title: string): void {
    const newTodo: TodoItem = {
        id: currentId++,
        title: title,
        completed: false
    };
    todoList.push(newTodo);
    console.log(`Added task: "${title}" (ID: ${newTodo.id})`);
}

/**
 * Edits an existing task's title.
 * @param id The ID of the task to edit.
 * @param newTitle The new title for the task.
 */
function editTodo(id: number, newTitle: string): void {
    const todo = todoList.find(t => t.id === id);
    if (todo) {
        const oldTitle = todo.title;
        todo.title = newTitle;
        console.log(`Edited task ID ${id}: Changed "${oldTitle}" to "${newTitle}"`);
    } else {
        console.error(`Error: Task with ID ${id} not found.`);
    }
}

/**
 * Deletes a task from the list by ID.
 * @param id The ID of the task to delete.
 */
function deleteTodo(id: number): void {
    const initialLength = todoList.length;
    todoList = todoList.filter(t => t.id !== id);
    
    if (todoList.length < initialLength) {
        console.log(`Deleted task with ID: ${id}`);
    } else {
        console.error(`Error: Task with ID ${id} not found.`);
    }
}

/**
 * Lists all tasks in the console.
 */
function listTodos(): void {
    if (todoList.length === 0) {
        console.log("Your Todo List is empty.");
        return;
    }

    console.log("\n--- Todo List ---");
    todoList.forEach(todo => {
        const status = todo.completed ? "[x]" : "[ ]";
        console.log(`${status} ID: ${todo.id} - ${todo.title}`);
    });
    console.log("-----------------\n");
}

/**
 * Marks a task as completed (Optional helper for better UX)
 * @param id The ID of the task to complete
 */
function completeTodo(id: number): void {
    const todo = todoList.find(t => t.id === id);
    if (todo) {
        todo.completed = true;
        console.log(`Marked task ID ${id} as completed.`);
    } else {
        console.error(`Error: Task with ID ${id} not found.`);
    }
}

// --- Example Usage ---
console.log("Initializing Todo Application...\n");

// 1. Add tasks
addTodo("Buy groceries");
addTodo("Finish TypeScript project");
addTodo("Call mom");

// 2. List tasks
listTodos();

// 3. Edit a task
editTodo(2, "Finish TypeScript project and submit");

// 4. Complete a task
completeTodo(1);

// 5. Delete a task
deleteTodo(3);

// 6. Final list
listTodos();
