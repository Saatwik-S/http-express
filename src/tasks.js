let tasks = [];

const updateObject = (newObject) => {
	tasks = newObject;
	return tasks;
};

module.exports = {tasks, updateObject};