let tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
  }
});

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    errorMsg.textContent = "Task cannot be empty!";
    return;
  }

  errorMsg.textContent = "";

  tasks.push(taskText);

  saveTasks();

  displayTasks();

  taskInput.value = "";
}

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
      <span class="task-text">${task}</span>
      <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">
        Delete
      </button>
    `;

    taskList.appendChild(li);
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      deleteTask(index);
    });
  });
}

function deleteTask(index) {
  tasks.splice(index, 1); 
  saveTasks();            
  displayTasks();         
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}