// dom.js

import { getProjectsCount, createProject, getTitle } from "./state.js";

// SELECTORS
const projectCount = document.querySelector(".projectCount");
const newProject = document.querySelector(".newProject");
const content = document.querySelector(".content");

function createProjectCard() {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("cardContainer");
    cardContainer.textContent = undefined;
    content.append(cardContainer);
}

function init() {
    newProject.addEventListener("click", () => {
        const title = getTitle();
        createProject(title);        
        // createDefaultProject();
        projectCount.textContent = getProjectsCount();
    })
    
}

export { init, createProjectCard };