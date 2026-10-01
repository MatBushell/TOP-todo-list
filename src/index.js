import "./reset.css";
import "./styles.css";
import { updateProjects } from "./dom.js" ;
import { Project, Task, Subtask } from "./model.js";
import { addProject, clearProjects, getProjectById } from "./state.js";




addProject(new Project("project 1"));
// console.log(projects);
console.log(getProjectById(1));
updateProjects();

