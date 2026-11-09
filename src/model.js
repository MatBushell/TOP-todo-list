// model.js

function Project(title) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    }
        if (!title || title.trim() === "") {
        throw new Error("You must include a title");
    }
    this.id = crypto.randomUUID();
    this.title = title.trim();
    this.taskList = [];
}
// #region PROJECT METHODS
Project.prototype.pushTask = function (task) {
    this.taskList.push(task);
}

Project.prototype.getTitle = function () {
    return this.title;
}

Project.prototype.newTask = function (title) {
    this.pushTask(new Task(title));
}

Project.prototype.tasksCount = function () {
    return this.taskList.length;
}

Project.prototype.getTaskList = function () {
    return this.taskList;
}

Project.prototype.rename = function (newTitle) {
    this.title = newTitle;
}



function Task(title, details = "", dueDate = null, starred = false) {
    if (!new.target) {
        throw new Error("You must use the 'new' operator to call the constructor.");
    }
    if (!title || title.trim() === "") {
        throw new Error("You must include a title");
    }
    this.id = crypto.randomUUID();
    this.title = title.trim();
    this.details = details;
    this.dueDate = dueDate;
    this.starred = starred;
    this.completed = false;
    this.subtasks = [];
}
// #endregion

// #region TASK METHODS


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

Task.prototype.setStarred = function (starred) {
    return this.starred = starred;
};

Task.prototype.getStarred = function () {
    return this.starred;
};

Task.prototype.toggleCompleted = function (completed) {
    return this.completed = !completed;
};

Task.prototype.getCompleted = function () {
    return this.completed;
};

// #endregion

function Subtask(title) {
    if (!new.target) {
        throw Error("You must use the new operator to call the constructor.");
    }
    this.id = crypto.randomUUID();
    this.title = title;
}

export { Project, Task, Subtask };