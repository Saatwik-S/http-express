
const router = require('express').Router();
const taskController = require('../controller/taskController');
router.delete('/completed', taskController.handleDeleteRequestForCompletedTasks);


router.route('/:id')
    .delete(taskController.handleDeleteRequestForTask)
    .patch(taskController.handlePatchRequestForTask);
module.exports = router;
