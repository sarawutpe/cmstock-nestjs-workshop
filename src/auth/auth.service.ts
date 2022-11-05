import { User } from './user.entity'
import { UserCredentailDto } from './dto/user-credential.dto'
import { UserRepository } from './user.repository'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt/dist'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository, private jwtService: JwtService) {}

  signUp(userCredentialDto: UserCredentailDto) {
    return this.userRepository.createUser(userCredentialDto)
  }

  async signIn(userCredentialDto: UserCredentailDto) {
    const username = await this.userRepository.verifyUserPassword(userCredentialDto)

    if (!username) {
      throw new UnauthorizedException('Invalid username or password')
    }

    const payload = { username }
    const token = this.jwtService.sign(payload)
    return { token }
  }
}
