let tasks = [];

function addTask() {
  const name = document.getElementById("taskName").value;
  const desc = document.getElementById("taskDesc").value;
  const date = document.getElementById("taskDate").value;

  if (!name || !desc || !date) {
    alert("Please fill all fields!");
    return;
  }

  tasks.push({ name, desc, date, done: false });
  document.getElementById("taskName").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskDate").value = "";
  updateTaskList();
}

function updateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    taskDiv.innerHTML = `
      <strong>${task.name}</strong><br/>
      ${task.desc}
      <div class="task-date">📅 Deadline: ${task.date}</div>
      <input type="checkbox" onchange="toggleDone(${index})" ${task.done ? "checked" : ""}/> Mark as Done
    `;

    taskList.appendChild(taskDiv);
  });

  const completed = tasks.filter(t => t.done).length;
  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;
  document.getElementById("progressBar").value = progress;
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  updateTaskList();
}
