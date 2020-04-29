import { Auth } from './auth'

export interface AuthRepository {
  login(email: string, password: string): Promise<Auth>
}