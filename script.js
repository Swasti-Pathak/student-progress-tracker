import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBHFLdenO3S9iJpG_P6BKPJ9HLE-gdBAiA",
  authDomain: "student-progress-tracker-d72cb.firebaseapp.com",
  projectId: "student-progress-tracker-d72cb",
  storageBucket: "student-progress-tracker-d72cb.appspot.com",
  messagingSenderId: "432413212328",
  appId: "1:432413212328:web:aae8d7bf8c0c61f934cc9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const milestones = document.getElementById("milestones");
const progressBar = document.getElementById("progressBar");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const taskDesc = document.getElementById("taskDesc").value;
  const dueDate = document.getElementById("dueDate").value;
  const milestone = document.getElementById("milestone").checked;

  const taskId = Date.now().toString();

  const taskData = {
    taskName,
    taskDesc,
    dueDate,
    milestone,
    completed: false
  };

  set(ref(db, "tasks/" + taskId), taskData);

  form.reset();
});

onValue(ref(db, "tasks/"), (snapshot) => {
  taskList.innerHTML = "";
  milestones.innerHTML = "";

  const data = snapshot.val();
  let completedCount = 0;
  let totalCount = 0;

  for (let id in data) {
    const task = data[id];
    totalCount++;

    const li = document.createElement("li");
    li.textContent = `${task.taskName} - Due: ${task.dueDate}`;
    li.className = task.completed ? "completed" : "";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.onclick = () => {
      set(ref(db, "tasks/" + id), { ...task, completed: !task.completed });
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      remove(ref(db, "tasks/" + id));
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    if (task.completed) completedCount++;

    if (task.milestone) {
      const div = document.createElement("div");
      div.className = "milestone";
      div.textContent = `🎯 ${task.taskName} - ${task.dueDate}`;
      milestones.appendChild(div);
    }
  }

  const percentage = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  progressBar.style.width = percentage + "%";
  progressBar.textContent = `${percentage}% Completed`;
});
