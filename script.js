document.addEventListener('DOMContentLoaded', renderTasks);

function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();
  if (taskText === '') return;

  const newTask = {
    text: taskText,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(newTask);
  saveTasks(tasks);
  input.value = '';
  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  const tasks = getTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' done' : '');

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const markBtn = document.createElement('button');
    markBtn.textContent = task.completed ? 'Undo' : 'Mark as Done';
    markBtn.className = 'mark-btn';
    markBtn.onclick = () => toggleTaskStatus(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTask(index);

    actionsDiv.appendChild(markBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actionsDiv);
    taskList.appendChild(li);
  });
}

function toggleTaskStatus(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}
