const { handleDeleteRequestForTask, handleDeleteRequestForCompletedTasks } = require('../tasks/deleteTask');
const { handlePatchRequestForTask } = require('../tasks/updateTask');

const router = require('express').Router();
router.delete('/completed', handleDeleteRequestForCompletedTasks);
router.delete('/:id', handleDeleteRequestForTask),
router.patch('/:id', handlePatchRequestForTask);
module.exports = router;
