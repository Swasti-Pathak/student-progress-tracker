// ✅ Firebase-Connected JavaScript (script.js)

// Access Firebase globals set in HTML
const db = window.db;
const ref = window.firebaseRef;
const set = window.firebaseSet;
const get = window.firebaseGet;
const onValue = window.firebaseOnValue;
const remove = window.firebaseRemove;

// 🔧 HTML Elements
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const milestoneSection = document.getElementById("milestones");

// 👇 Replace with a unique user ID (can use login later)
const USER_ID = "test_user_01";
const TASKS_PATH = ref(db, `users/${USER_ID}/tasks`);

// 🟢 Submit New Task
if (taskForm) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = document.getElementById("taskName").value;
    const taskDesc = document.getElementById("taskDesc").value;
    const dueDate = document.getElementById("dueDate").value;
    const isMilestone = document.getElementById("milestone").checked;

    const taskId = Date.now().toString();
    const taskData = {
      name: taskName,
      description: taskDesc,
      dueDate: dueDate,
      completed: false,
      milestone: isMilestone
    };

    set(ref(db, `users/${USER_ID}/tasks/${taskId}`), taskData);

    taskForm.reset();
  });
}

// 🔄 Render Tasks in Realtime
onValue(TASKS_PATH, (snapshot) => {
  taskList.innerHTML = "";
  milestoneSection.innerHTML = "";
  let completed = 0, total = 0;

  snapshot.forEach((child) => {
    const id = child.key;
    const task = child.val();
    total++;
    if (task.completed) completed++;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <strong>${task.name}</strong> - ${task.description} <br>
      Due: ${task.dueDate} <br>
      <button onclick="toggleTask('${id}', ${task.completed})">${task.completed ? "Undo" : "Complete"}</button>
      <button onclick="deleteTask('${id}')">Delete</button>
    `;
    taskList.appendChild(li);

    if (task.milestone) {
      const m = document.createElement("div");
      m.className = "milestone";
      m.innerHTML = `🎯 <strong>${task.name}</strong> – Deadline: ${task.dueDate}`;
      milestoneSection.appendChild(m);
    }
  });

  // 🔵 Update progress
  const percent = total === 0 ? 0 : Math.floor((completed / total) * 100);
  progressBar.style.width = `${percent}%`;
  progressBar.innerText = `${percent}% Completed`;
});

// ✅ Toggle Completion
window.toggleTask = function(id, currentStatus) {
  set(ref(db, `users/${USER_ID}/tasks/${id}/completed`), !currentStatus);
};

// ❌ Delete Task
window.deleteTask = function(id) {
  remove(ref(db, `users/${USER_ID}/tasks/${id}`));
};

