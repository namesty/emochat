import { AuthService } from "../domain/auth-service";

export class AuthServiceFactory {
  static build(): AuthService {
    return new AuthService()
  }
}