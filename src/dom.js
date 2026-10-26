// dom.js

import { getProjectsCount, createProject, promptForTitle,completedTasks, projects, starred } from "./state.js";

// SELECTORS
const projectCount = document.querySelector(".projectCount");
const appContainer = document.querySelector(".appContainer");
const content = document.querySelector(".content");
const stared = document.querySelector(".starred");
const nav = document.querySelector(".nav");




const plusButton = document.createElement("button");
plusButton.textContent = "add";
plusButton.classList.add("add", "material-symbols-outlined", "plusButton");
appContainer.append(plusButton);

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

function handleTabClick(e) {
    const navItems = document.querySelectorAll(".nav li");

    navItems.forEach(item => {
        item.classList.remove("isActive");
    });

    if (e.target.id === "create-project") {
        const newTitle = promptForTitle();
        if (newTitle) {
            createProject(newTitle);
            addTab();
            createProjectCard();
        }
    } else if (e.target.dataset.id === "star") {
        e.target.classList.add("isActive");
        createStarCard();
        // console.log("you clicked the star");
    } else {
        e.target.classList.add("isActive");
        const tabId = e.target.dataset.id;

        createProjectCard(tabId);
        const currProject = getCurrentProject();
        paintTasksList(currProject);

        // cardTask.addEventListener("click", handleTaskClick);//This works here because ul was created by createProjectCard();


    }

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

        const circle = document.createElement("button");
        circle.classList.add("material-symbols-outlined", "circle");
        circle.textContent = "circle";

        const taskTitle = document.createElement("button");
        taskTitle.classList.add("taskTitle");
        taskTitle.textContent = tasks[curTask].title;
        
        const star = document.createElement("button");
        star.textContent = "star";
        star.classList.add("material-symbols-outlined", "starButton");

        containerLeft.append(circle);
        containerMiddle.append(taskTitle);
        containerRight.append(star);
        taskContainer.append(containerLeft, containerMiddle, containerRight);
        cardTasks.append(taskContainer);
    }

}

function handleTaskClick(e) {
    const li = e.target.closest("li");

    if (!li) return;

    console.log("you clicked the a task");

}

function getCurrentProject() {
    // Gets the "active" tab ID and uses it to retrieve the object from projects arr by same ID.
    const id = document.querySelector(".isActive").dataset.id;
    let currProject;
    projects.forEach(function (p) {
        if (p.id === id) {
            currProject = p;
        }
    });
    return currProject;

}

function handlePlusClick() {

    const currProject = getCurrentProject();
    currProject.newTask(promptForTitle());
    console.log(currProject);
    console.log(currProject.tasksCount());
    paintTasksList(currProject);
}

function init() {
    nav.addEventListener("click", handleTabClick);
    plusButton.addEventListener("click", handlePlusClick);
    content.addEventListener("click", handleTaskClick);


    // Creates Default tabs and card (except +New - hard coded.)
    addStarTab();
    createProject("My Tasks"); //Object in projects array
    createProjectCard(); // Default card in dom - sources projects array
    addTab(); // My tasks tab




}

export { init };