const { handleDeleteRequestForTask, handleDeleteRequestForCompletedTasks } = require('../functions/tasks/deleteTask');
const { handlePatchRequestForTask } = require('../functions/tasks/updateTask');

const router = require('express').Router();
router.delete('/completed', handleDeleteRequestForCompletedTasks);


router.route('/:id')
	.delete(handleDeleteRequestForTask)
	.patch(handlePatchRequestForTask);
module.exports = router;
