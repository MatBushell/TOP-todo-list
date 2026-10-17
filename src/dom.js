// dom.js

import { getProjectsCount, createProject, promptForTitle, projects, starred } from "./state.js";

// SELECTORS
const projectCount = document.querySelector(".projectCount");
const content = document.querySelector(".content");
const stared = document.querySelector(".starred");
const nav = document.querySelector(".nav");


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
    content.textContent = "";
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

function clearContentElement() {
    return content.textContent = undefined;
}


function createProjectCard(tabId) {
    // Create and append card elements + styling
    const id = tabId;
    clearContentElement();
    const projectCard = document.createElement("div");
    content.append(projectCard);
    projectCard.classList.add("projectCard"); // Styling
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("cardHeader");
    projectCard.append(cardHeader);
    const cardTitle = document.createElement("div");
    const sortBy = document.createElement("div");
    sortBy.classList.add("material-symbols-outlined", "sortBy");
    sortBy.textContent = "mobiledata_arrows";
    const actions = document.createElement("div");
    actions.classList.add("material-symbols-outlined", "actions");
    actions.textContent = "more_vert";
    cardHeader.append(cardTitle, sortBy, actions);

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

function init() {
    nav.addEventListener("click", handleTabClick);
    addStarTab();
    createProject("My Tasks");
    createProjectCard();
    addTab();
}

export { init };