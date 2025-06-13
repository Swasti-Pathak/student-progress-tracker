function addTask() {
  const name = document.getElementById('taskName').value;
  const desc = document.getElementById('taskDesc').value;
  const date = document.getElementById('taskDate').value;

  if (!name || !date) {
    alert("Please fill in all required fields.");
    return;
  }

  const taskSection = document.querySelector('.task-list');
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task-item');
  taskDiv.innerHTML = `
    <h3>${name}</h3>
    <p>${desc}</p>
    <small>Due: ${date}</small>
    <hr />
  `;
  taskSection.appendChild(taskDiv);

  updateProgress();
}

function updateProgress() {
  const tasks = document.querySelectorAll('.task-item').length;
  const progress = document.getElementById('progressBar');
  const text = document.getElementById('progressText');

  const percent = Math.min(tasks * 10, 100); // example logic
  progress.value = percent;
  text.textContent = `${percent}% Completed`;
}
