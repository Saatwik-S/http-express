const { tasks } = require('../../tasks');


const handleDeleteRequestForCompletedTasks = (request, response) => {
	try {

		deleteTask(undefined, true);

		response.send('Task(s) Deleted');

	}
	catch (error) {
		response.status(403)
			.send(error.toString());
	}
};


const handleDeleteRequestForTask = (request, response) => {
	try {
		const id = request.params.id;

		deleteTask(parseInt(id), undefined);

		response.send('Task(s) Deleted');

	}
	catch (error) {
		response.status(403)
			.send(error.toString());
	}

};



/**
 * It deletes a task from the tasks array
 * @param id - The ID of the task to delete.
 * @param deleteCompletedTasks - boolean
 * @returns A boolean value
 */

const deleteTask = (id, deleteCompletedTasks) => {
	if (deleteCompletedTasks) {
		tasks.map((element) => element.isCompleted ? element.isDeleted = true : undefined);
		return true;
	}


	if (!id || typeof id !== 'number') {
		throw new Error('Invalid ID Type');
	}



	const indexOfTask = tasks.findIndex(task => task.id === id);
	if (indexOfTask === -1) throw new Error('Invalid Task ID Provided');
	tasks[indexOfTask].isDeleted = true;
	return true;

};

module.exports = { handleDeleteRequestForTask, handleDeleteRequestForCompletedTasks };