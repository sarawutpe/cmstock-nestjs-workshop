import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// Generate decorator for get field username (options)
export const GetUsername = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return req.user.username
})
