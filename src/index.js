`A projects array contains project objects which contain a method for adding new tasks to the tasks array within each project...?`

const projects = [];
const completedTasks = [];

function Project(title) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    }
    this.title = title;
    this.tasks = [];
}
// #region Project methods
Project.prototype.pushTask = function (task) {
    this.tasks.push(task);
}

function Task(title) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    }
    this.title = title;
    this.details = undefined;
    this.dueDate = undefined;
    this.priority = undefined;
    this.completed = false;
    this.subtasks = [];
}

Project.prototype.newTask = function (title) {
    return new Task(title);
}

// #endregion

// #region task methods
function Subtask(title) {
    if (!new.target) {
        throw Error("You must use the new operator to call the constructor.");
    }
    this.title = title;
}

Task.prototype.pushSubtask = function(subtask) {
    this.subtasks.push(subtask);
}

Task.prototype.newSubtask = function (title) {
    return new Subtask(title);
}

Task.prototype.setTitle = function (title) {
    return this.title = title;
};

Task.prototype.getTitle = function () {
    return this.title;
};

Task.prototype.setDetails = function (details) {
    return this.details = details;
};

Task.prototype.getDetails = function () {
    return this.details;
};

Task.prototype.setDuedate = function (dueDate) {
    return this.duedate = dueDate;
};

Task.prototype.getDuedate = function () {
    return this.dueDate;
};

Task.prototype.setPriority = function (priority) {
    return this.priotiy = priority;
};

Task.prototype.getPriority = function () {
    return this.priority;
};

Task.prototype.setCompleted = function (completed) {
    return this.completed = completed;
};

Task.prototype.getCompleted = function () {
    return this.completed;
};


// #endregion



projects.push(new Project("project 1"));
console.log(projects);

projects[0].pushTask(projects[0].newTask("My First Task"));
projects[0].tasks[0].setDetails("These working?");


projects[0].tasks[0].pushSubtask(projects[0].tasks[0].newSubtask("hello?"));
console.log(projects[0].tasks[0].subtasks[0].title);

