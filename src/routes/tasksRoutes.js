const { handlePostRequestForTask } = require('../functions/tasks/addTask');
const { handleGetRequestForTask } = require('../functions/tasks/fetchTask');



const router = require('express').Router();

router.route('/')
	.get(handleGetRequestForTask)
	.post(handlePostRequestForTask);
router.get('/:id', handleGetRequestForTask);

module.exports = router;


