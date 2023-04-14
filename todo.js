// This is for the all the popups for add and delect. The popup is hidden initialy to show this popups we use this functions
let addPopup = document.getElementById("add-popup");
let delectPopup = document.getElementById("delect-popup");
let addedPopup = document.getElementById("added-popup");

// function to get the add event popup
function openPopup(){
    addPopup.classList.add("open-add-popup");
}
// function to close the add event popup
function closePopup(){
    addPopup.classList.remove("open-add-popup");
}

// function to get the succesfully event added addPopup
function openaddedpopup(){
    addedPopup.classList.add("open-added-popup");
}
// To close the event added popup
function closeaddedpopup(){
    addedPopup.classList.remove("open-added-popup");
}

// function to show the delect popup
function openDelectPopup(){
    delectPopup.classList.add("open-delect-popup");
}
// function to close the delect popup
function closeDelectPopup(){
    delectPopup.classList.remove("open-delect-popup");
}

//--------------------

// This are to performe opreations like add events delete events render taskList.
// array that contain all event objects
let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const delectC = document.getElementById('delete');

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="bin.svg" class="delete-btn" data-id="${task.id}" id="delete-btn" />
    `;

    taskList.append(li);
}

function renderList(){
    taskList.innerHTML='';

    for(let i=0; i<tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId){
    const task = tasks.filter(function(task){
        return task.id === taskId;
    });
    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('Could not toggle the task');
}

function deleteTask(taskId){
    const newTasks =[];
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id !== taskId){
            newTasks.push(tasks[i]);
        }
    }
    tasks = newTasks;
    renderList();
    // showNotification('Task delected successfully');
}

// Add a new task
function addTask(task){
    if(task){
        // adding task to the array
        tasks.push(task);
        renderList();
        openaddedpopup();
        return;
    }
    showNotification('Task can not be added');
}

// function to show the alert message passed.
function showNotification(text){
    alert(text);
}

// Function to handile the keybord events. passing event on enter button.
function handleInputKeypress(e){
    if(e.key == 'Enter'){
        const text = e.target.value;

        // if task is empty it will show alert
        if(!text){
            showNotification('Task text can not be empty');
            return;
        }

        // creating task object
        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }

        // making input bar null and passing tark to add function
        e.target.value='';
        addTask(task);
    }
}

// This is to pass the task on clicking on add button
function addTaskOnClick(){
    var input = document.getElementById("add");
    var content = input.value;

    if(!content){
        showNotification('Task text can not be empty');
        return;
    }

    const task = {
        text: content,
        id: Date.now().toString(),
        done: false
    }

    input.value='';
    addTask(task);
}

// This function is to handle the click events for delect or checkbox
function handleClickListener(e){
    const target = e.target;
    
    if(target.className == 'delete-btn'){
        const taskId = target.dataset.id;
        openDelectPopup();
        document.addEventListener('click', function(x){
            const sTarget = x.target;
            if(sTarget.className == 'delete'){
                deleteTask(taskId);
                closeDelectPopup();
                return;
            }else if(sTarget.className == 'cancle'){
                closeDelectPopup();
                return;
            }
        });
        // delectC.addEventListener('click' ,function(){
        //     deleteTask(taskId);
        //     closeDelectPopup();
        //     return;
        // });
        return;
    }else if(target.className == 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp(){
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}

initializeApp();