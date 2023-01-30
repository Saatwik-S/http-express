/**
 * It takes a request and response object, and adds the task to the database
 * @param {Request} request  - This is the request object. It contains all the information about the request that
 * was made.
 * @param {Response} response - The response object that will be sent back to the client.
 */

const { addTask } = require('../services/tasks/addTask');
const { deleteTask } = require('../services/tasks/deleteTask');
const { fetchTask } = require('../services/tasks/fetchTask');
const { updateTask } = require('../services/tasks/updateTask');

const handlePostRequestForTask = (request, response) => {
    try {
        const task = addTask(request.body);
        response.status(201).send(task);
    }
    catch (error) {
        response.status(403).send(error.toString());
    }

};

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
 * 
 * @param {Request} request 
 * @param {Response} response 
 */
const handleGetRequestForTask = (request, response) => {   
    try {
        const task = request.params.id !== undefined ? fetchTask(parseInt(request.params.id), false) : fetchTask(undefined, true);
        response.send((task));
        
    } 
    catch (error) {
        response.status(403).
            send(error.toString());

    }
	
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

module.exports = { handlePostRequestForTask, handleDeleteRequestForCompletedTasks, handleDeleteRequestForTask, handleGetRequestForTask, handlePatchRequestForTask };