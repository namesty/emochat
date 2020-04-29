import { UserRepository } from "../domain/user-repository";
import { UserHttpRepository } from "./user-http-repository";
import { UserDTOToUserMapper } from "./user-dto-mapper";
import { UserToUserDTOMapper } from "./dto-user-mapper";

export class UserRepositoryFactory {
  static build(): UserRepository {
    return new UserHttpRepository(new UserDTOToUserMapper(), new UserToUserDTOMapper())
  }
}