import { Validator } from '@/application/validation'

export class ValidationComposite implements Validator {
  constructor (private readonly validators: Validator[]) {}

  validate (): Error | undefined {
    for (const validation of this.validators) {
      const error = validation.validate()
      if (error !== undefined) {
        return error
      }
    }
    return undefined
  }
}
