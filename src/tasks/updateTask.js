/**
 * It takes an id and an object of data to be updated, and returns true if the task is updated
 * successfully
 * @param id - The id of the task to be updated.
 * @param dataToBeUpdated - This is an object that contains the data that needs to be updated.
 * @returns task as the index
 */

const { tasks } = require('../tasks');

const updateTask = (id, dataToBeUpdated) => {


	if (!id || typeof id !== 'number') {
		throw new Error('Invalid ID Type');
	}
	const indexOfTask = tasks.findIndex(task => task.id === id && !task.isDeleted);
	if (indexOfTask === -1) throw new Error('Task not found');
	

	if (dataToBeUpdated['isCompleted']) {
		tasks[indexOfTask].isCompleted = Boolean(dataToBeUpdated['isCompleted']);

	}
	return tasks[indexOfTask];

};
const handlePatchRequestForTask = (request, response) => {
	try {
		const id = request.params.id;
	
		const task = updateTask(parseInt(id), request.query);
		response.send((task));

    
	}
	catch (error) {
		response.status(403)
			.send(error.toString());
	}
   
};

module.exports = {handlePatchRequestForTask};
