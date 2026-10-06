// state.js
import { Project } from "./model.js";

const projects = [];
const completedTasks = [];

function getProjectsCount() {
    return projects.length;
}

function createProject(title) {
    projects.push(new Project(title));
}

function getTitle() {
    prompt("Title: ");
}

export { getProjectsCount, createProject, getTitle };


