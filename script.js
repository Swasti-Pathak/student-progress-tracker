let tasks = [];

function addTask() {
  const name = document.getElementById('taskName').value;
  const desc = document.getElementById('taskDesc').value;
  const date = document.getElementById('taskDate').value;
  const isMilestone = document.getElementById('isMilestone').checked;

  if (!name || !date) {
    alert("Task name and date are required.");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    desc,
    date,
    isMilestone,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  updateProgress();

  // Clear inputs
  document.getElementById('taskName').value = '';
  document.getElementById('taskDesc').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('isMilestone').checked = false;
}

function renderTasks() {
  const container = document.getElementById('tasksContainer');
  container.innerHTML = '';

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';
    if (task.completed) taskDiv.classList.add('completed');
    if (task.isMilestone) taskDiv.classList.add('milestone');

    taskDiv.innerHTML = `
      <strong>${task.name}</strong> 
      <br/>
      ${task.desc ? `<p>${task.desc}</p>` : ''}
      <small>📅 Due: ${task.date}</small>
      ${task.isMilestone ? '<p>🌟 <strong>Milestone</strong></p>' : ''}
      <div class="task-buttons">
        <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    container.appendChild(taskDiv);
  });
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  renderTasks();
  updateProgress();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
  updateProgress();
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  document.getElementById('progressBar').value = percent;
  document.getElementById('progressText').textContent = `${percent}% Completed`;
}

window.onload = () => {
  renderTasks();
  updateProgress();
};
