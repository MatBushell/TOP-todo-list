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
    newTab.classList.add("isActive");
    const ref = document.querySelector(".defaultProject");
    ref.insertAdjacentElement("afterend", newTab);
}

function createProjectCard() {
    // Create and append card elements + styling
    const projectCard = document.createElement("div");
    content.append(projectCard);
    projectCard.classList.add("projectCard"); // Styling
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("cardHeader");
    projectCard.append(cardHeader);
    const cardTitle = document.createElement("div");
    cardTitle.textContent = projects[projects.length - 1].title;
    const sortBy = document.createElement("div");
    sortBy.classList.add("material-symbols-outlined", "sortBy");
    sortBy.textContent = "mobiledata_arrows";
    const actions = document.createElement("div");
    actions.classList.add("material-symbols-outlined", "actions");
    actions.textContent = "more_vert";
    cardHeader.append(cardTitle, sortBy, actions);

}

function handleTabClick(e) {
    const navItems = document.querySelectorAll(".nav li");
    navItems.forEach(item => {
        item.classList.remove("isActive");
    })
    if (!e.target.classList.contains("newProject")) {
        e.target.classList.add("isActive");
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
}

export { init, createProjectCard };