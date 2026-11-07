// state.js
import { Project, Subtask } from "./model.js";

let projects = [];
const completedTasks = [];
const starred = [ "No tasks yet..." ];

function getProjectsCount() {
    return projects.length;
}

function createProject(title) {
    projects.push(new Project(title));
}

function deleteProject(id) {
    const idx = projects.findIndex(p => p.id === id);
    const updatedProjects = projects.toSpliced(id, 1);
    projects = updatedProjects;
}


function promptForTitle() {
    return prompt("Title: ");
}

export { getProjectsCount, createProject,  deleteProject, promptForTitle, projects, starred, completedTasks };


