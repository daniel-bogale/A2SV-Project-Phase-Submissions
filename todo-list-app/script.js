document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const dateDisplay = document.getElementById('date-display');

    // State
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Initialize
    displayDate();
    renderTasks();

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Functions
    function displayDate() {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateEmptyState();
    }

    function updateEmptyState() {
        if (tasks.length === 0) {
            emptyState.classList.add('visible');
        } else {
            emptyState.classList.remove('visible');
        }
    }

    function addTask() {
        const text = todoInput.value.trim();
        if (text === '') return;

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = '';
        todoInput.focus();
    }

    function deleteTask(id, element) {
        element.classList.add('fade-out');
        element.addEventListener('animationend', () => {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            element.remove();
        });
    }

    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasks();
        // Re-render to update UI state correctly without full reload
        // Or simpler: toggle class on specific element
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        const content = taskElement.querySelector('.todo-content');
        content.classList.toggle('completed');
    }

    function updateTaskText(id, newText) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText };
            }
            return task;
        });
        saveTasks();
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = task.id;

        li.innerHTML = `
            <div class="checkbox-wrapper">
                <input type="checkbox" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
            </div>
            <div class="todo-content ${task.completed ? 'completed' : ''}" contenteditable="true" spellcheck="false">
                ${escapeHtml(task.text)}
            </div>
            <div class="todo-actions">
                <button class="btn-action btn-delete" aria-label="Delete task">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        `;

        // Event Listeners for this specific task
        const checkbox = li.querySelector('.custom-checkbox');
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const deleteBtn = li.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => deleteTask(task.id, li));

        const content = li.querySelector('.todo-content');
        
        // Handle content edit
        content.addEventListener('blur', () => {
            const newText = content.textContent.trim();
            if (newText === '') {
                deleteTask(task.id, li); // Remove if empty
            } else {
                updateTaskText(task.id, newText);
            }
        });

        content.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                content.blur();
            }
        });

        // Click on item to focus edit (if not clicking checkbox or delete)
        li.addEventListener('click', (e) => {
            if (e.target !== checkbox && !deleteBtn.contains(e.target) && e.target !== content) {
                content.focus();
            }
        });

        todoList.appendChild(li);
        updateEmptyState();
    }

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach(task => renderTask(task));
        updateEmptyState();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
