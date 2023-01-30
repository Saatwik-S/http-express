const { getNewTaskID, tasks } = require('../../../util/tasks');


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
        id: getNewTaskID(),
        name: taskInfo['name'],
        isCompleted: false,
    });
    return tasks[tasks.length - 1];
};





 
module.exports = {addTask};