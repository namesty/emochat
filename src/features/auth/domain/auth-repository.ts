import { Auth } from './auth'

export interface AuthRepository {
  login(email: string, password: string): Promise<Auth>
  signup(name: string, lastName: string, password: string, email: string): Promise<Auth>
}