import { UserDTO } from "../../user/infrastructure/user-dto";

export interface AuthDTO {
  user: UserDTO,
  token: string 
}