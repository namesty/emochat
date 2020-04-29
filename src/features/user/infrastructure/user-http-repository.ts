import { UserRepository } from "../domain/user-repository";
import { UserDTOToUserMapper } from "./user-dto-mapper";
import { UserToUserDTOMapper } from "./dto-user-mapper";
import { User } from "../domain/user";
import { http } from "../../../core/http/axios";
import { UserDTO } from "./user-dto";

export class UserHttpRepository implements UserRepository {
  constructor(
    private readonly userDTOToUserMapper: UserDTOToUserMapper,
    private readonly userToUserDTOMapper: UserToUserDTOMapper
  ) {}

  async findAll(): Promise<User[]> {
    const response = await http.get<UserDTO[]>('/user')
    return response.data.map(userDto => this.userDTOToUserMapper.map(userDto))
  }
}