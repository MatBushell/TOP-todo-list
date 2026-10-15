// dom.js

import { getProjectsCount, createProject, promptForTitle, projects } from "./state.js";

// SELECTORS
const projectCount = document.querySelector(".projectCount");
const newProject = document.querySelector(".newProject");
const content = document.querySelector(".content");
const nav = document.querySelector(".nav");


function addTab() {
    const newTab = document.createElement("li");
    newTab.textContent = projects.at(-1).title;
    newTab.dataset.id = projects.at(-1).id;
    newTab.classList.add("isActive");
    const ref = document.querySelector(".newProject");
    ref.insertAdjacentElement("afterend", newTab);
}

function createProjectCard(tabId) {
    // Create and append card elements + styling
    const id = tabId;
    content.textContent = undefined;
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

    if (!e.target.classList.contains("newProject")) {
        e.target.classList.add("isActive");
        const tabId = e.target.dataset.id;
        console.log(tabId);
        //add content paint here
        createProjectCard(tabId);
        console.log(projects);
    } else {
        const newTitle = promptForTitle();
        if (newTitle) {
            createProject(newTitle);
            addTab();
            createProjectCard();
        }
    }

}

function init() {
    nav.addEventListener("click", handleTabClick);
    createProject("My Tasks");
    createProjectCard(projects.at(-1).id);
    addTab();
    console.log(projects[0].id);
}

export { init, createProjectCard };