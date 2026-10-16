// state.js
import { Project } from "./model.js";

const projects = [];
const completedTasks = [];
const starred = [ "No tasks yet..." ];

function getProjectsCount() {
    return projects.length;
}

function createProject(title) {
    projects.push(new Project(title));
}

function promptForTitle() {
    return prompt("Title: ");
}

export { getProjectsCount, createProject, promptForTitle, projects, starred };


