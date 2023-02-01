/**
 * It takes a request and response object, and adds the task to the database
 * @param {Request} request  - This is the request object. It contains all the information about the request that
 * was made.
 * @param {Response} response - The response object that will be sent back to the client.
 */

const taskService = require('../services/taskService')
const joi = require('joi')
const HTTPError = require('../util/errors/HTTPError')
const handlePostRequestForTask = async (request, response) => {
  try {
    const schema = joi.object({
      name: joi.string().alphanum().min(1).max(1000).required()
    })
    const { error, value } = schema.validate(request.body)
    if (error) {
      throw new HTTPError(error.message, 400)
    }

    const task = await taskService.addTask(request.body)

    response.status(201).send(task)
  } catch (error) {
    if (error instanceof HTTPError) {
      response.status(error.code).json({ message: error.message })
    }
    // response.status(400).send(error.toString())
  }
}

const handleDeleteRequestForCompletedTasks = async (request, response) => {
  try {
    await taskService.deleteTask(undefined, true)

    response.send('Task(s) Deleted')
  } catch (error) {
    response.status(403)
      .send(error.toString())
  }
}

const handleDeleteRequestForTask = async (request, response) => {
  try {
    const id = request.params.id

    await taskService.deleteTask(parseInt(id), undefined)

    response.send('Task(s) Deleted')
  } catch (error) {
    response.status(403)
      .send(error.toString())
  }
}

/**
 *
 * @param {Request} request
 * @param {Response} response
 */
const handleGetRequestForTask = async (request, response) => {
  try {
    const task = request.params.id !== undefined ? await taskService.fetchTask(parseInt(request.params.id), false) : await taskService.fetchTask(undefined, true)
    response.json(task)
  } catch (error) {
    if (error instanceof HTTPError) {
      response.status(error.code).json({ message: error.message })
    } else {
      response.status(500).json({ message: 'Something Broke.. Internal Server Error' })
    }
  }
}
const handlePatchRequestForTask = async (request, response) => {
  try {
    const id = request.params.id

    const task = await taskService.updateTask(parseInt(id), request.query)
    response.send((task))
  } catch (error) {
    response.status(403)
      .send(error.toString())
  }
}

module.exports = { handlePostRequestForTask, handleDeleteRequestForCompletedTasks, handleDeleteRequestForTask, handleGetRequestForTask, handlePatchRequestForTask }
