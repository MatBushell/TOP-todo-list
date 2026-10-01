const projects = [];
const completedTasks = [];

function clearProjects() {
    projects.length = 0;
}

function addProject(obj) {
    projects.push(obj);
}

function getProjectById(id) {
    for (let i = 0; i < projects.length; i++) {
        const obj = projects[i];
        if (obj.id === id) {
            return obj;
        }
    }
    console.log(`No project with that ID`);
    return undefined;
}

export { clearProjects, getProjectById, addProject };


