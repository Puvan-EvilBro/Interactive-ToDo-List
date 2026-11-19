
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const clearBtn = document.getElementById("clearBtn");

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update statistics
function updateStats() {

    let total = tasks.length;

    let completed = tasks.filter(
        task => task.completed
    ).length;

    let pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("task-text");

        if (task.completed) {
            span.classList.add("completed");
        }

        let actions = document.createElement("div");
        actions.classList.add("actions");

        // Complete button
        let completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.classList.add("complete-btn");

        completeBtn.addEventListener("click", function() {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();

        });

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();

        });

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

    updateStats();
}

// Add task
function addTask() {

    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    input.value = "";

    saveTasks();
    displayTasks();
}

// Add button event
addBtn.addEventListener("click", addTask);

// Enter key event
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Clear all tasks
clearBtn.addEventListener("click", function() {

    if (tasks.length === 0) {
        alert("No tasks to clear!");
        return;
    }

    let confirmDelete = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmDelete) {

        tasks = [];

        saveTasks();
        displayTasks();

        alert("All tasks cleared!");

    }

});

// Load saved tasks
displayTasks();
