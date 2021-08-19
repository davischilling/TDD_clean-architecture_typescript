import { ExpressRouter } from '@/infra/http'
import { Controller } from '@/application/controllers'

import { Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ExpressRouter', () => {
  let sut: ExpressRouter
  let req: Request
  let res: Response
  let controller: MockProxy<Controller>

  beforeAll(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { any: 'any' }
    })
  })

  beforeEach(() => {
    sut = new ExpressRouter(controller)
  })

  it('should call handle with correct request', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with empty request', async () => {
    req = getMockReq()

    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with 200 and correct data', async () => {
    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ any: 'any' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 400 and correct error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('ctrl_error')
    })

    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'ctrl_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 500 and correct error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('ctrl_error')
    })

    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'ctrl_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
