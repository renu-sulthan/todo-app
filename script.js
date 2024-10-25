const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const newTask = todoInput.value;
    if (newTask === '') {
        alert('Please enter a task!');
        return;
    }
    addTask(newTask);
    todoInput.value = ''; // Clears the input field after adding a task
});

function addTask(task) {
    const listItem = createListItem(task);
    const checkBox = createTaskCheckBox(listItem);
    const deleteButton = createTaskDeleteButton(listItem);
    const editButton = createTaskEditButton(listItem);

    listItem.appendChild(checkBox);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    todoList.appendChild(listItem);
}

function createListItem(task) {
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);
    return listItem;
}

function createTaskCheckBox(listItem) {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.addEventListener('change', function() {
        const taskText = listItem.querySelector('span');
        if (this.checked) {
            taskText.style.textDecoration = 'line-through';
        } else {
            taskText.style.textDecoration = 'none';
        }
    });
    return checkBox;
}

function createTaskDeleteButton(listItem) {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // delete icon
    deleteButton.addEventListener('click', function() {
        todoList.removeChild(listItem);
    });
    return deleteButton;
}

function createTaskEditButton(listItem) {
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>'; // Edit icon
    const taskText = listItem.querySelector('span');

    editButton.addEventListener('click', function() {
        if (editButton.innerHTML === '<i class="fas fa-edit"></i>') {
            // Switch to edit mode
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskText.textContent;
            listItem.insertBefore(input, taskText);
            listItem.removeChild(taskText);
            editButton.innerHTML = '<i class="fas fa-save"></i>'; // Save icon
        } else {
            // Switch back to view mode
            const input = listItem.querySelector('input[type="text"]');
            taskText.textContent = input.value; 
            
            listItem.removeChild(input);

            listItem.insertBefore(taskText, listItem.firstChild);

            editButton.innerHTML = '<i class="fas fa-edit"></i>'; 
        }
    });
    return editButton;
}

