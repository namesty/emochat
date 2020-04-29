import { UserDTO } from './user-dto'
import { User } from '../domain/user'

export class UserToUserDTOMapper {
  map(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email
    }
  }
}