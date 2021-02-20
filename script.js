let tasksDiv = document.querySelector(".card");

// initialise array to store todo-items
if (window.localStorage.getItem("tasks") == undefined) {
    let tasks = [];
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

let tasks = JSON.parse(window.localStorage.getItem("tasks"));

let tasksHtml = tasks.map((task) => {
    return createTaskNode(task);
});

function createTaskNode(task) {
    let taskNode = document.createElement("div");
    taskNode.className = "checkbox";
    let label = document.createElement("label");
    let input = document.createElement("input");
    input.type = "checkbox";
    let deleteButton = document.createElement("a");
    deleteButton.className = "delete";
    deleteButton.append("🗑️");
    deleteButton.addEventListener("click", function () {
        deleteTask(task, taskNode);
    });
    label.appendChild(input);
    label.append(task);
    label.appendChild(deleteButton);
    taskNode.appendChild(label);
    return taskNode;
}

function addTask(e) {
    e.preventDefault();
    let form = document.forms["addNewTask"];
    tasks.push(form["task"].value);
    tasksDiv.appendChild(createTaskNode(form["task"].value));
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(task, taskNode) {
    let index = tasks.indexOf(task);
    tasksDiv.removeChild(taskNode);
    tasks.splice(index, 1);
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

tasksHtml.forEach((task) => {
    tasksDiv.appendChild(task);
});
