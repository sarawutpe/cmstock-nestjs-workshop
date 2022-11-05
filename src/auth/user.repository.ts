import { Repository, EntityRepository } from 'typeorm'
import { UserCredentailDto } from './dto/user-credential.dto'
import { User } from './user.entity'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<UserCredentailDto> {
  async createUser(createUserCredentialDto: UserCredentailDto): Promise<User> {
    const { username, password } = createUserCredentialDto
    const salt = bcrypt.genSaltSync()

    const user = new User()
    user.username = username
    user.password = await this.hashPassword(password, salt)
    user.salt = salt

    try {
      await user.save()
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Error, because this username already exist!')
      } else {
        throw new InternalServerErrorException()
      }
    }
    return user
  }

  async verifyUserPassword(userCredentialDto: UserCredentailDto) {
    const { username, password } = userCredentialDto
    const user = await this.findOne({ username })

    if (user && (await user.verifyPassword(password))) {
      return user.username
    } else {
      return 'invalid'
    }
  }

  async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt)
  }
}
