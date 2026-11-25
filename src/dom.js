// dom.js

import { getProjectsCount, createProject, deleteProject, promptForTitle, completedTasks, projects, starredArr } from "./state.js";
import { Project, Task } from "./model.js";

// SELECTORS
const projectCount = document.querySelector(".projectCount");
const appContainer = document.querySelector(".appContainer");
const content = document.querySelector(".content");
const stared = document.querySelector(".starred");
const nav = document.querySelector(".nav");
// Create new task selectors
const plusButton = document.querySelector(".addTaskButton");
const addTaskDialog = document.getElementById("addTaskDialog");
const addTaskForm = document.getElementById("addTaskForm");
const detailsButton = document.querySelector(".detailsButton");
const datePickerPopover = document.getElementById("datePicker");
const schedulButton = document.querySelector(".schedulButton");
const newStarButton = document.querySelector(".newStarButton");
// Create new list / project selectors
const addProjectDialog = document.getElementById("addProjectDialog");
const addProjectForm = document.getElementById("addProjectForm");
// const saveNewProject = document.querySelector("saveNewProject")
const cancelNewProject = document.querySelector(".cancelNewProject");
const addProjectTextInput = document.getElementById("newProjectTitle");
// Edit list / project selectors
const editProjectDialog = document.getElementById("editProjectDialog");
const renameProjectDialog = document.getElementById("renameProjectDialog");
const renameProjectForm = document.getElementById("renameProjectForm");
const deleteList = document.querySelector(".deleteList");
const renameList = document.querySelector(".renameList");
// default project id
let myTasksId;


function positionPopover() {
    const rect = schedulButton.getBoundingClientRect();
    datePickerPopover.style.position = "absolute";
    datePickerPopover.style.margin = "0";
    datePickerPopover.style.top = `${rect.bottom + window.scrollY + 8}px`; // 8px offset
    datePickerPopover.style.left = `${rect.left + window.scrollX}px`

}

function editProject(e) {
    const currProject = getCurrentProject();
    if (currProject.id === myTasksId) {
        deleteList.disabled = true;
    } else {
        deleteList.disabled = false;
    }
    const editMenu = e.target.closest(".actions");
    if (!editMenu) return;
    editProjectDialog.showModal();
}

function renameProject(e) {
    e.preventDefault();
    const currProject = getCurrentProject();
    const id = currProject.id;
    const formData = new FormData(renameProjectForm);
    const newTitle = formData.get("projectTitle");
    currProject.rename(newTitle);
    const currentTab = document.querySelector(".isActive");
    currentTab.textContent = currProject.getTitle();

    // currProject.pushTask(newTask);


    renameProjectForm.reset();
    renameProjectDialog.close();
    createProjectCard(id);
    paintTasksList(currProject);

}

function clearContentElement() {
    return content.textContent = undefined;
}

function addTab() {
    const newTab = document.createElement("li");
    newTab.textContent = projects.at(-1).title;
    newTab.dataset.id = projects.at(-1).id;
    newTab.classList.add("isActive");
    const ref = document.querySelector(".newProject");
    ref.insertAdjacentElement("beforebegin", newTab);
}

function addStarTab() {
    const starTab = document.createElement("li");
    starTab.textContent = "star";
    starTab.dataset.id = "star";
    starTab.classList.add("star", "material-symbols-outlined");
    const parent = document.querySelector(".nav");
    parent.insertAdjacentElement("afterbegin", starTab);
}

function createStarCard() {
    clearContentElement();
    const starCard = document.createElement("div");
    content.append(starCard);
    starCard.classList.add("starred", "projectCard"); // Styling
    const starCardHeader = document.createElement("div");
    starCardHeader.classList.add("cardHeader");
    starCard.append(starCardHeader);
    const starCardTitle = document.createElement("div");
    starCardTitle.textContent = "Starred";
    const sortBy = document.createElement("div");
    sortBy.classList.add("material-symbols-outlined", "sortBy");
    sortBy.textContent = "mobiledata_arrows";

    starCardHeader.append(starCardTitle, sortBy);

}

function createProjectCard(tabId) {
    // Create and append card elements + styling
    const id = tabId;
    clearContentElement();
    // Card
    const projectCard = document.createElement("div");
    content.append(projectCard);
    projectCard.classList.add("projectCard");

    // Card Header
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("cardHeader");

    // Card Body (contains tasks)
    const cardTasks = document.createElement("div");
    cardTasks.classList.add("cardTasks");

    projectCard.append(cardHeader, cardTasks);

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("cardTitle");

    // Widgets container
    const cardWidgets = document.createElement("div");
    cardWidgets.classList.add("cardWidgets");

    // Widgets
    const sortBy = document.createElement("div");
    sortBy.classList.add("material-symbols-outlined", "sortBy");
    sortBy.textContent = "mobiledata_arrows";
    const actions = document.createElement("div");
    actions.classList.add("material-symbols-outlined", "actions");
    actions.textContent = "more_vert";

    cardWidgets.append(sortBy, actions);
    cardHeader.append(cardTitle, cardWidgets);

    if (id) {
        cardTitle.textContent = projects.find(p => p.id === id)?.title;
    } else {
        cardTitle.textContent = projects[projects.length - 1].title;
    }



}

function handleNewListDone(e) {
    e.preventDefault();
    const formData = new FormData(addProjectForm);
    const formObject = Object.fromEntries(formData.entries());
    const { id, projectTitle: title, taskList } = formObject;
    createProject(title);
    clearActiveTabs();
    addTab();
    createProjectCard();
    addProjectForm.reset();
    addProjectDialog.close();

}

function clearActiveTabs() {
    const navItems = document.querySelectorAll(".nav li");
    navItems.forEach(item => {
        item.classList.remove("isActive");
    });
}

function handleTabClick(e) {
    // const navItems = document.querySelectorAll(".nav li");
    // const currProject = getCurrentProject();

    // navItems.forEach(item => {
    //     item.classList.remove("isActive");
    // });

    if (e.target.id === "create-project") {
        addProjectDialog.showModal();

    } else if (e.target.dataset.id === "star") {
        clearActiveTabs();
        e.target.classList.add("isActive");
        createStarCard();
    } else {
        clearActiveTabs();
        e.target.classList.add("isActive");
        const tabId = e.target.dataset.id;

        createProjectCard(tabId);
        const currProject = getCurrentProject();
        paintTasksList(currProject);

    }

}

// TASK FUNCTIONS

// -- NEW TASK FUNCTIONS

function addDetails(e) {
    const detailsButton = e.target.closest(".detailsButton");
    if (!detailsButton) return;
    const ref = document.querySelector(".taskTitleTextbox");
    const detailsTextInput = document.createElement("textarea");
    detailsTextInput.classList.add("details");
    detailsTextInput.name = "details";
    detailsTextInput.rows = 5;
    detailsTextInput.cols = 40;
    detailsTextInput.placeholder = "Details...";
    // detailsTextInput.value = "";
    ref.insertAdjacentElement("afterend", detailsTextInput);

}

function paintTasksList(currProject) {// creates dom elements for current projects taskList items ("tasks").

    const tasks = currProject.getTaskList();
    const cardTasks = document.querySelector(".cardTasks");
    cardTasks.textContent = "";

    for (let curTask = 0; curTask < tasks.length; curTask++) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("taskContainer");
        taskContainer.dataset.id = tasks[curTask].id;

        const containerLeft = document.createElement("div");
        containerLeft.classList.add("containerLeft");

        const containerMiddle = document.createElement("div");
        containerMiddle.classList.add("containerMiddle");

        const containerRight = document.createElement("div");
        containerRight.classList.add("containerRight");

        const circleButton = document.createElement("button");
        circleButton.classList.add("material-symbols-outlined", "circleButton");
        circleButton.textContent = "circle";

        const taskTitle = document.createElement("button");
        taskTitle.classList.add("taskTitle");
        taskTitle.textContent = tasks[curTask].title;

        const star = document.createElement("button");
        star.textContent = "star";
        star.classList.add("material-symbols-outlined", "existingStarButton");

        if (tasks[curTask].starred === "on" || tasks[curTask].starred === true) {
            star.classList.toggle("is-filled");
        }

        if (tasks[curTask].completed === true) {
            circleButton.classList.toggle("is-filled");
            taskContainer.classList.add("completed");
        }


        containerLeft.append(circleButton);
        containerMiddle.append(taskTitle);
        containerRight.append(star);
        taskContainer.append(containerLeft, containerMiddle, containerRight);
        
        // sort completed and incompleted
        if (taskContainer.classList.contains("completed")) {
            cardTasks.append(taskContainer); // add to the end
        } else {
            cardTasks.prepend(taskContainer);
        }

    }

}

// function sortCompleted() {
//     const taskContainer = document.querySelectorAll(".taskContainer");
//     const completedTasks = taskContainer.querySelectorAll(".completed");
// }

function completeTask(e) {
    const circleButton = e.target.closest(".circleButton");
    const curTask = e.target.closest(".taskContainer");
    const id = curTask?.getAttribute("data-id");
    const currProject = getCurrentProject();
    const tasks = currProject.getTaskList();
    const foundTask = tasks.find(task => task.id === id);
    if (!circleButton) return;
    foundTask.toggleCompleted(); // mutate the object
    circleButton.classList.toggle("is-filled"); //update button ui
    paintTasksList(currProject); // update tasks ui
    console.log(tasks[0], tasks[1]);
    console.log("You completed a task!");
}

function editTask(e) {
    const taskTitle = e.target.closest(".taskTitle");
    if (!taskTitle) return;
    const editTaskDialog = document.querySelector(".editTaskDialog");
    editTaskDialog.showModal();
    console.log("you clicked the a task");


}

function starTask(e) {
    const star = e.target.closest(".existingStarButton");
    const curTask = e.target.closest(".taskContainer");
    const id = curTask?.getAttribute("data-id");
    const currProject = getCurrentProject();
    const tasks = currProject.getTaskList();
    const foundTask = tasks.find(task => task.id === id);

    // console.log(`The current project id is: ${currProject.id} and it's title is ${foundTask.title}`);
    // console.log(tasks[0]);

    if (!star) return;
    // console.log(`You clicked the star! with data-id: ${id}`);
    foundTask.toggleStarred();
    star.classList.toggle("is-filled");
    // console.log(tasks[0]);
}

function getActiveTabId() {
    return document.querySelector(".isActive").dataset.id;
}

function getCurrentProject() {
    // Gets the "active" tab ID and uses it to retrieve the object from projects arr by same ID.
    const id = getActiveTabId();
    let currProject;
    projects.forEach(function (p) {
        if (p.id === id) {
            currProject = p;
        }
    });
    return currProject;

}

function handlePlusClick() {
    addTaskDialog.showModal();
}

function handleTaskSave(e) {
    e.preventDefault();
    const currProject = getCurrentProject();
    const formData = new FormData(addTaskForm);
    const formObject = Object.fromEntries(formData.entries());
    const { id, taskTitle: title, details, dueDate, starred } = formObject;
    const newTask = new Task(title, details, dueDate, starred);
    console.log(title);
    // console.log(starred);
    currProject.pushTask(newTask);
    console.log(projects);


    addTaskForm.reset();
    addTaskDialog.close();
    paintTasksList(currProject);

}

function scanForCompletedTasks(e) {
    const circleButton = e.closest(".circleButton");

}

function init() {
    nav.addEventListener("click", handleTabClick);
    // New Task listeners
    plusButton.addEventListener("click", handlePlusClick);
    addTaskForm.addEventListener("submit", handleTaskSave);
    addTaskDialog.addEventListener("close", () => {
        const detailsEl = document.querySelector(".details");
        if (detailsEl) {
            detailsEl.remove();
        }
        addTaskForm.reset();
        newStarButton.classList.remove("is-filled");
    });
    detailsButton.addEventListener("click", (e) => {
        const detailsEl = document.querySelector(".details");
        if (!detailsEl) {
            addDetails(e);
        } else {
            detailsEl.remove();
        }

    });

    datePickerPopover.addEventListener("beforetoggle", (e) => {
        if (e.newState === "open") {
            positionPopover();
        }
    });

    newStarButton.addEventListener("click", () => {
        const currProject = getCurrentProject();
        console.log(currProject.id);

        newStarButton.classList.toggle("is-filled");

    })
    // schedulButton.addEventListener("click", () => {
    //     datePickerPopover.togglePopover();

    // })

    // Existing task listeners
    content.addEventListener("click", editTask);
    content.addEventListener("click", completeTask);
    content.addEventListener("click", starTask);

    // Project Listeners
    addProjectForm.addEventListener("submit", (e) => {
        handleNewListDone(e);
    });
    cancelNewProject.addEventListener("click", () => {
        addProjectForm.reset();
        addProjectDialog.close();
    })
    content.addEventListener("click", editProject);
    renameList.addEventListener("click", () => {
        editProjectDialog.close();
        renameProjectDialog.showModal();
    });
    // rename project
    renameProjectForm.addEventListener("submit", renameProject);
    // delete project
    deleteList.addEventListener("click", () => {
        const currProject = getCurrentProject();
        const id = currProject.id;
        const currProjectTab = [...document.querySelectorAll(".nav li")].find(li => li.dataset.id === id);
        const tabToLeft = currProjectTab.previousElementSibling;
        currProjectTab.remove();
        deleteProject(id);
        clearActiveTabs();
        tabToLeft.classList.add("isActive");
        // addTab();
        // updateTabs();
        createProjectCard();
        editProjectDialog.close();
        console.log(projects);
        paintTasksList(getCurrentProject());
    });
    // Creates Default tabs and card (except +New - hard coded.)
    addStarTab();
    createProject("My Tasks"); //Object in projects array
    createProjectCard(); // Default card in dom - sources projects array
    addTab(); // My tasks tab
    // updateTabs();
    // get myTasksId
    const myTasks = getCurrentProject();
    myTasksId = myTasks.id;
    console.log(projects);
}

export { init };