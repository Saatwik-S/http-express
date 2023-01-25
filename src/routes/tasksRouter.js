const { handlePostRequestForTask } = require('../functions/tasks/addTask');
const { handleGetRequestForTask } = require('../functions/tasks/fetchTask');



const router = require('express').Router();

router.get('/', handleGetRequestForTask);
router.get('/:id', handleGetRequestForTask),
router.post('/', handlePostRequestForTask),

module.exports = router;
