// model.js

function Project(title) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.tasks = [];
}
// #region PROJECT METHODS
Project.prototype.pushTask = function (task) {
    this.tasks.push(task);
}

Project.prototype.getTitle = function() {
    return this.title;
}

function Task(title) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    }
    this.id = crypto.randomUUID();
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

// #region TASK METHODS
function Subtask(title) {
    if (!new.target) {
        throw Error("You must use the new operator to call the constructor.");
    }
    this.id = crypto.randomUUID();
    this.title = title;
}

Task.prototype.pushSubtask = function (subtask) {
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
    return this.dueDate = dueDate;
};

Task.prototype.getDuedate = function () {
    return this.dueDate;
};

Task.prototype.setPriority = function (priority) {
    return this.priority = priority;
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

export { Project, Task, Subtask };