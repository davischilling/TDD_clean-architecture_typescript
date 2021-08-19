import { Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'
import { Controller } from '@/application/controllers'

class ExpressRouter {
  constructor (
    private readonly controller: Controller
  ) {}

  async adapt (req: Request, res: Response): Promise<void> {
    await this.controller.handle({ ...req.body })
  }
}

describe('ExpressRouter', () => {
  let sut: ExpressRouter
  let req: Request
  let res: Response
  let controller: MockProxy<Controller>

  beforeAll(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    controller = mock()
  })

  beforeEach(() => {
    sut = new ExpressRouter(controller)
  })

  it('should call handle with correct request', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })

  it('should call handle with empty request', async () => {
    req = getMockReq()

    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
  })
})
