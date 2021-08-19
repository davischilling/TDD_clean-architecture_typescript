import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeFacebookLoginController as facebookLogin } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/login/facebook', adapt(facebookLogin()))
}
