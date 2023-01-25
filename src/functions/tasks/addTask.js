
const { tasks } = require('../../tasks');

/**
 * It takes a taskInfo object, checks if it has a name property, and if it does, it adds it to the
 * tasks array
 * @param taskInfo - This is the object that contains the task name.
 * @returns The last element of the tasks array.
 */
const addTask = (taskInfo) => {
	if (!taskInfo['name']) throw new Error('Missing Task Key');
	if (taskInfo['name'].toString().length == 0) throw new Error('Task name missing');
	tasks.push({
		id: tasks.length + 1,
		name: taskInfo['name'],
		isCompleted: false,
	});
	return tasks[tasks.length - 1];
};


/**
 * It takes a request and response object, and adds the task to the database
 * @param {Request} request  - This is the request object. It contains all the information about the request that
 * was made.
 * @param {Response} response - The response object that will be sent back to the client.
 */

const handlePostRequestForTask = (request, response) => {
	try {
		const task = addTask(request.body);
		response.send(task);
	}
	catch (error) {
		response.status(403).send(error.toString());
	}

};



 
module.exports = {handlePostRequestForTask};