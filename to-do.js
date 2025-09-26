const inputBox = document.getElementById('taskInput');
const listContainer = document.getElementById('taskList');
const button = document.getElementById('addTaskBtn');

function addTask() {
    let task = inputBox.value.trim();

    if (task !== "") {
        let li = document.createElement('li');
        li.innerHTML = `
        <div class="taskMain">
            <div class="taskContent">
                <input type="checkbox" class="taskCheck">
                <span class="taskText">${task}</span>
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
            <small class="due">Due: Not set</small>
        </div>
        `;

    
        const editBtn = li.querySelector('.editBtn');
        const deleteBtn = li.querySelector('.deleteBtn');
        const taskText = li.querySelector('.taskText');

    
        editBtn.addEventListener("click", () => {
            let input = document.createElement("input");
            input.type = "text";
            input.value = taskText.textContent;
            input.className = "editInput";

         
            li.querySelector(".taskContent").replaceChild(input, taskText);
            input.focus();

            
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    finishEdit();
                }
            });

            
            // input.addEventListener("blur", finishEdit);

            function finishEdit() {
                let newText = input.value.trim();
                if (newText !== "") {
                    taskText.textContent = newText;
                }
              
                li.querySelector(".taskContent").replaceChild(taskText, input);
            }
        });


        deleteBtn.addEventListener("click", () => {
            li.remove();
        });

        listContainer.appendChild(li);
        inputBox.value = "";
    } else {
        alert("Please enter a task");
    }
}

button.addEventListener("click", addTask);
