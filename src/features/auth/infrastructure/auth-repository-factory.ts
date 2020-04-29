import { AuthRepository } from "../domain/auth-repository";
import { AuthHttpRepository } from "./auth-http-repository";
import { AuthDTOToAuthMapper } from "./dto-auth-mapper";
import { UserDTOToUserMapper } from "../../user/infrastructure/user-dto-mapper";

export class AuthRepositoryFactory {
  static build(): AuthRepository {
    return new AuthHttpRepository(new UserDTOToUserMapper(), new AuthDTOToAuthMapper())
  }
}