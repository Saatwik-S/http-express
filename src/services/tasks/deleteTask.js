const { tasks, updateObject } =   require('../../util/tasks');




/**
 * It deletes a task from the tasks array
 * @param id - The ID of the task to delete.
 * @param deleteCompletedTasks - boolean
 * @returns A boolean value
 */

const deleteTask = (id, deleteCompletedTasks) => {
    if (deleteCompletedTasks) {
        updateObject(tasks.filter(e => e.isCompleted === false));
        //tasks.map((element) => element.isCompleted ? element.isDeleted = true : undefined);
        return true;
    }


    if (!id || typeof id !== 'number') {
        throw new Error('Invalid ID Type');
    }



    const indexOfTask = tasks.findIndex(task => task.id === id);
    if (indexOfTask === -1) throw new Error('Invalid Task ID Provided');
    tasks.splice(indexOfTask, 1);
    //tasks[indexOfTask].isDeleted = true;
    return true;

};

module.exports = { deleteTask };