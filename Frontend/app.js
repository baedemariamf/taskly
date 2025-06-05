const tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true }
];

let currentFilter = 'all';

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <span>${task.title}</span>
      <div class="task-buttons">
        <button onclick="toggleComplete(${task.id})">✔️</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const title = input.value.trim();
  if (!title) {
    alert('Task title cannot be empty!');
    return;
  }
  const newTask = {
    id: Date.now(),
    title,
    completed: false
  };
  tasks.push(newTask);
  input.value = '';
  renderTasks();
}

function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index > -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

renderTasks();