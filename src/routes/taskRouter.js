const { handleDeleteRequestForTask, handleDeleteRequestForCompletedTasks } = require('../functions/tasks/deleteTask');
const { handlePatchRequestForTask } = require('../functions/tasks/updateTask');

const router = require('express').Router();
router.delete('/completed', handleDeleteRequestForCompletedTasks);
router.delete('/:id', handleDeleteRequestForTask),
router.patch('/:id', handlePatchRequestForTask);
module.exports = router;
