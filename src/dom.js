// dom.js

import { getProjectsCount, createProject, promptForTitle, projects, starred, createTask } from "./state.js";

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
    const button = document.createElement("li");
    button.textContent = "star";
    button.dataset.id = "star";
    button.classList.add("star", "material-symbols-outlined");
    const parent = document.querySelector(".nav");
    parent.insertAdjacentElement("afterbegin", button);
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
    projectCard.append(cardHeader);
    const cardTitle = document.createElement("div");
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
        console.log("you clicked the star");
    } else {
        e.target.classList.add("isActive");
        const tabId = e.target.dataset.id;
        console.log(tabId);
        //add content paint here
        createProjectCard(tabId);
        console.log(projects);

    }

}

function handlePlusClick() {
    // const activeProject = document.querySelector(".isActive");
    console.log("the button?");
}

function init() {
    nav.addEventListener("click", handleTabClick);

    // Creates Default tabs and card (except +New - hard coded.)
    addStarTab();
    createProject("My Tasks"); //Object in projects array
    createProjectCard(); // Default card in dom - sources projects array
    addTab(); // My tasks tab

    plusButton.addEventListener("click", handlePlusClick);
}

export { init };