// script.js
const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

// Function to display todos
const displayTodos = async () => {
    const response = await fetch('/todos');
    const todos = await response.json();
    
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove');
        removeButton.addEventListener('click', () => removeTodo(index));

        li.appendChild(removeButton);
        todoList.appendChild(li);
    });
};

// Function to add a new todo
const addTodo = async () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: todoText }),
        });
        todoInput.value = '';
        displayTodos();
    }
};

// Function to remove a todo
const removeTodo = async (index) => {
    await fetch(`/todos/${index}`, {
        method: 'DELETE',
    });
    displayTodos();
};

// Event listener for the add button
addTodoButton.addEventListener('click', addTodo);

// Initial display of todos
displayTodos();
