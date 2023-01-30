const { tasks } =  require('../../../util/tasks');
/*
 * "If allTasks is true, return all tasks, otherwise, if id is a number, return the task with that id,
 * otherwise throw an error."
 * 
 * The function is a little more complicated than that, but that's the gist of it
 * @param id - The ID of the task to fetch.
 * @param allTasks - A boolean value that indicates whether to return all tasks or just one task.
 * @returns the task with the id that was passed in.
 */
const fetchTask = (id, allTasks) => {
    if (allTasks) return tasks.filter(task => !task.isDeleted);
    if (typeof (id) !== 'number') throw new Error('Invalid ID');
    const task = tasks.filter(task => task.id === id && !task.isDeleted);
    if (task.length == 0) throw new Error('Task Not Found');
    return task[0];
};



module.exports = {fetchTask};