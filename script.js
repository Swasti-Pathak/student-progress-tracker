let tasks = [];

function addTask() {
  const name = document.getElementById("taskName").value;
  const desc = document.getElementById("taskDesc").value;
  const date = document.getElementById("taskDate").value;

  if (name === "") {
    alert("Task name is required");
    return;
  }

  const task = {
    name,
    desc,
    date,
    completed: false
  };

  tasks.push(task);
  updateDisplay();
  clearInputs();
}

function updateDisplay() {
  const taskList = document.getElementById("taskList");
  const milestoneList = document.getElementById("milestoneList");
  const completedTasks = tasks.filter(t => t.completed).length;

  taskList.innerHTML = "";
  milestoneList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.name}</strong> - ${task.desc} (Due: ${task.date})
      <button onclick="markComplete(${index})">${task.completed ? "✅" : "Mark Done"}</button>
    `;
    taskList.appendChild(li);

    if (task.date) {
      const ms = document.createElement("li");
      ms.textContent = `${task.name} → ${task.date}`;
      milestoneList.appendChild(ms);
    }
  });

  const percent = Math.round((completedTasks / tasks.length) * 100) || 0;
  document.getElementById("progressText").innerText = `${percent}% Completed`;
  document.getElementById("progressBar").value = percent;
}

function markComplete(index) {
  tasks[index].completed = true;
  updateDisplay();
}

function clearInputs() {
  document.getElementById("taskName").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskDate").value = "";
}
