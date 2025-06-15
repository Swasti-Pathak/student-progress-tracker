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
  const milestoneList = document.getElementById("milestoneList");
  taskList.innerHTML = "";
  milestoneList.innerHTML = "";

  const today = new Date();
  let completed = 0;

  tasks.forEach((task, index) => {
    const taskDate = new Date(task.date);
    const timeDiff = (taskDate - today) / (1000 * 3600 * 24);
    const isUpcoming = timeDiff >= 0 && timeDiff <= 3;
    const isDone = task.done;

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = `
      <strong>${task.name}</strong><br/>
      ${task.desc}
      <div class="task-date">📅 Deadline: ${task.date}</div>
      <input type="checkbox" onchange="toggleDone(${index})" ${isDone ? "checked" : ""}/> Mark as Done
    `;
    taskList.appendChild(taskDiv);

    const milestoneItem = document.createElement("li");
    milestoneItem.textContent = `${task.name} - ${task.date}`;

    if (isDone) {
      milestoneItem.classList.add("achieved");
      completed++;
    } else if (isUpcoming) {
      milestoneItem.classList.add("highlight-deadline");
    }

    milestoneList.appendChild(milestoneItem);
  });

  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;
  document.getElementById("progressBar").value = progress;
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  updateTaskList();
}
