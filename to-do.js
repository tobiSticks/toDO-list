const inputBox = document.getElementById('taskInput');
const listContainer = document.getElementById('taskList');
const button = document.getElementById('addTaskBtn');

// Load tasks on page load
window.addEventListener("load", loadTasks);

function addTask() {
    let task = inputBox.value.trim();

    if (task !== "") {
        let li = createTaskElement(task, false, "Not set");
        listContainer.appendChild(li);
        saveTasks();
        inputBox.value = "";
    } else {
        alert("Please enter a task");
    }
}

button.addEventListener("click", addTask);

// Create task element
function createTaskElement(text, checked, due) {
    let li = document.createElement('li');
    li.innerHTML = `
        <div class="taskMain">
            <div class="taskContent">
                <input type="checkbox" class="taskCheck" ${checked ? "checked" : ""}>
                <span class="taskText">${text}</span>
            </div>
            <div class="taskActions">
                <button class="editBtn">
                    <img src="icon/pencil.svg" alt="Edit">
                </button>
                <button class="deleteBtn">
                    <img src="icon/delete2.svg" alt="Delete">
                </button>
            </div>
        </div>
        <div class="dueDate">
            <small class="due">Due: ${due}</small>
        </div>
    `;

    const editBtn = li.querySelector('.editBtn');
    const deleteBtn = li.querySelector('.deleteBtn');
    const checkBox = li.querySelector('.taskCheck');
    const taskText = li.querySelector('.taskText');

    // Inline edit
    editBtn.addEventListener("click", () => {
        let input = document.createElement("input");
        input.type = "text";
        input.value = taskText.textContent;
        input.className = "editInput";

        li.querySelector(".taskContent").replaceChild(input, taskText);
        input.focus();

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") finishEdit();
        });

        input.addEventListener("blur", finishEdit);

        function finishEdit() {
            let newText = input.value.trim();
            if (newText !== "") taskText.textContent = newText;
            li.querySelector(".taskContent").replaceChild(taskText, input);
            saveTasks();
        }
    });

    // Delete
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    // Checkbox
    checkBox.addEventListener("change", () => {
        saveTasks();
    });

    return li;
}

// Save tasks
function saveTasks() {
    let tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector(".taskText").textContent,
            checked: li.querySelector(".taskCheck").checked,
            due: li.querySelector(".due").textContent.replace("Due: ", "")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = createTaskElement(task.text, task.checked, task.due);
        listContainer.appendChild(li);
    });
}
