import { AuthDTO } from "./auth-dto";
import { UserDTOToUserMapper } from "../../user/infrastructure/user-dto-mapper";
import { Auth } from "../domain/auth";

export class AuthDTOToAuthMapper {
  map(authDTO: AuthDTO, userDTOToUserMapper: UserDTOToUserMapper): Auth {
    return {
      user: userDTOToUserMapper.map(authDTO.user),
      token: authDTO.token
    }
  }
}