const tasks = [];

const updateObject = (newObject) => {
    tasks.splice(0);
    tasks.push(...newObject);
};

let currentTaskId = 1;

const getNewTaskID = () => currentTaskId++;

module.exports = {tasks, updateObject, getNewTaskID};