
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task){
  const cssClass = task.done ? "full-list-item task-title--done" : 'full-list-item';


  const taskHTML = `<li id='${task.id}' class="full-list list-group-item">
					   
					   <span class="${cssClass}">${task.text}</span>
					   <div>
						   <button type="button" class='btn-action' data-action='done'>
							   <img src="./img/tick.svg">
						   </button>
						   <button type="button" class='btn-action' data-action='delete'>
							   <img src="./img/cross.svg">
						   </button>
					   </div>
				   </li>`;

  taskList.insertAdjacentHTML("beforeend", taskHTML);
})


checkEmptyList ();

form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener('click', doneTask);

function addTask(event) {
  // отменяем отправку формы
  event.preventDefault();

  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  }

  tasks.push(newTask);
  saveToLocalStorage();

  const cssClass = newTask.done ? "full-list-item task-title--done" : 'full-list-item';


  const taskHTML = `<li id='${newTask.id}' class="full-list list-group-item">
					   
					   <span class="${cssClass}">${newTask.text}</span>
					   <div>
						   <button type="button" class='btn-action' data-action='done'>
							   <img src="./img/tick.svg">
						   </button>
						   <button type="button" class='btn-action' data-action='delete'>
							   <img src="./img/cross.svg">
						   </button>
					   </div>
				   </li>`;

  taskList.insertAdjacentHTML("beforeend", taskHTML);

  taskInput.value = "";
  taskInput.focus();

  checkEmptyList ();
}


function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item");

    const id = Number(parentNode.id);
    const index = tasks.findIndex(function (task) {
      if (task.id === id) {
        return true;
      }
    })

    tasks.splice(index, 1)

  console.log(tasks);

    parentNode.remove();
  }

  checkEmptyList ();
  saveToLocalStorage();

}


function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");
    const id =Number(parentNode.id);

    const task = tasks.find(function (task) {
      if (task.id === id) {
        return true;
      }
    })

    task.done = !task.done;

    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('span');
    taskTitle.classList.toggle('task-title--done'); 
  
  }
}

function checkEmptyList () {
  if (tasks.length === 0) {
 const emptyListHTML = `<li class="li-head" id="emptyList">
					<div class='leaf'><img src="./img/leaf.svg"></div>
					<div class ='empty'>Список дел пуст</div>	
				</li>`;
        taskList.insertAdjacentHTML('afterbegin', emptyListHTML)
  }
  
  if(tasks.length > 0) {
    const emptyListEl = document.querySelector('#emptyList');
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}