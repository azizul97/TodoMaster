document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateStats() {
        totalTasksSpan.textContent = `Total tasks: ${todos.length}`;
        const completedCount = todos.filter(todo => todo.completed).length;
        completedTasksSpan.textContent = `Completed: ${completedCount}`;
    }

    function createTodoItem(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="actions">
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;

        const textSpan = li.querySelector('.todo-text');
        const deleteBtn = li.querySelector('.delete-btn');

        textSpan.addEventListener('click', () => {
            todo.completed = !todo.completed;
            li.classList.toggle('completed');
            saveToLocalStorage();
            updateStats();
        });

        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(item => item.id !== todo.id);
            li.remove();
            saveToLocalStorage();
            updateStats();
        });

        return li;
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            todoList.appendChild(createTodoItem(todo));
        });
        updateStats();
    }

    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            const newTodo = {
                id: Date.now(),
                text,
                completed: false
            };
            todos.push(newTodo);
            todoInput.value = '';
            renderTodos();
            saveToLocalStorage();
        }
    }

    addBtn.addEventListener('click', addTodo);

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Initial render
    renderTodos();
});