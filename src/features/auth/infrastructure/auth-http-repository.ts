import { AuthRepository } from "../domain/auth-repository"
import { AuthDTOToAuthMapper } from "./dto-auth-mapper"
import { UserDTOToUserMapper } from "../../user/infrastructure/user-dto-mapper"
import { Auth } from "../domain/auth"
import { http } from "../../../core/http/axios"
import { AuthDTO } from "./auth-dto"
import { UserDTO } from "../../user/infrastructure/user-dto"

export class AuthHttpRepository implements AuthRepository {
  constructor(
    private readonly userDTOToUserMapper: UserDTOToUserMapper,
    private readonly authDTOToAuthMapper: AuthDTOToAuthMapper
  ) {}

  async login(email: string, password: string): Promise<Auth> {
    const response = await http.post<AuthDTO>('/auth/login', {
      email,
      password
    })
    const auth = this.authDTOToAuthMapper.map(response.data, this.userDTOToUserMapper)

    localStorage.setItem('token', auth.token)
    localStorage.setItem('user', JSON.stringify(auth.user))

    return auth
  }

  async signup(name: string, lastName: string, email: string, password: string): Promise<Auth> {
    const response = await http.post<UserDTO>('/auth/signup', {
      email,
      password,
      name,
      lastName
    })
    const user = this.userDTOToUserMapper.map(response.data)

    return await this.login(user.email, password)
  }
}