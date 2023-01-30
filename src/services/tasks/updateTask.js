
const { tasks } =   require('../../util/tasks');


/**
 * It takes an id and an object of data to be updated, and returns true if the task is updated
 * successfully
 * @param id - The id of the task to be updated.
 * @param dataToBeUpdated - This is an object that contains the data that needs to be updated.
 * @returns task as the index
 */

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


module.exports = {updateTask};
