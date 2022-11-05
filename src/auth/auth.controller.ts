import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { UserCredentailDto } from './dto/user-credential.dto'
import { GetUsername } from './get-username.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() userCredential: UserCredentailDto) {
    console.log(userCredential)
    return this.authenService.signUp(userCredential)
  }

  @Post('/signin')
  signIn(@Body() userCredential: UserCredentailDto) {
    console.log(userCredential)
    return this.authenService.signIn(userCredential)
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUsername() username) {
    // get from req (normal)
    // console.log(req)
    // return req.user.username

    // get from decorator
    return username
  }
}
