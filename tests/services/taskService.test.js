//import { it, describe, expect, jest } from '@jest/globals'

const db = require('../../models')
const taskService = require('../../src/services/taskService')
describe('Test for task service', () => {
  const generateMockRes = () => ({ json: jest.fn(), send: jest.fn(), status: jest.fn().mockReturnThis() })

  describe('While adding a new task', () => {
    it('Should successfully add a new task', async () => {
      jest.spyOn(db.Task, 'create').mockResolvedValue({
        dataValues:
{
  id: 1,
  name: 'Hello',
  isCompleted: false
}
      }
      )
      const returned = await taskService.addTask({ name: 'Hello' })
      expect(db.Task.create).toBeCalledTimes(1)
      expect(returned).toEqual(
        {
          id: 1,
          name: 'Hello',
          isCompleted: false
        }
      )
    })
  })
})
