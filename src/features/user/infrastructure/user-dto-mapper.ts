import { UserDTO } from './user-dto'
import { User } from '../domain/user'

export class UserDTOToUserMapper {
  map(userDto: UserDTO): User {
    return {
      id: userDto.id,
      name: userDto.name,
      lastName: userDto.lastName,
      email: userDto.email
    }
  }
}