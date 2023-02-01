/* eslint-disable no-undef */
// generate test cases with jest for controller
// const { expect, jest, test, describe } = require('@jest/globals')

const taskService = require('../../src/services/taskService')
const tasksController = require('../../src/controller/taskController')
describe('Test Cases for TODO APP', () => {
  describe('Test cases for GET Request', () => {
    it('should send back all the tasks', async () => {
      jest.spyOn(taskService, 'fetchTask').mockResolvedValue([{ id: 1 }])
      const mockRes = { send: jest.fn() }
      const mockReq = { params: {} }

      await tasksController.handleGetRequestForTask(mockReq
        , mockRes)

      expect(mockRes.send).toHaveBeenCalledWith([{ id: 1 }])
    })

    it('should send back the test with id:  1', async () => {
      jest.spyOn(taskService, 'fetchTask').mockResolvedValue({
        id: 1,
        name: 'hello world',
        isComplete: false
      })
      const mockReq = {
        params: {
          id: 1
        }
      }
      const mockRes = {
        send: jest.fn()
      }
      await tasksController.handleGetRequestForTask(mockReq, mockRes)
      expect(mockRes.send).toHaveBeenCalledWith({
        id: 1,
        name: 'hello world',
        isComplete: false
      })
    })
  })

  describe('Test for POST Req', () => {
    it('should create a task', async () => {
      jest.spyOn(taskService, 'addTask').mockResolvedValue({
        id: 1,
        name: 'hello world',
        isComplete: false
      })

      const mockRes = { status: jest.fn().mockReturnValue({ send: jest.fn() }) }

      await tasksController.handlePostRequestForTask({
        body: { name: 'hello world' }
      }, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.status().send).toHaveBeenCalledWith({
        id: 1,
        name: 'hello world',
        isComplete: false
      })
    })
  })
})
