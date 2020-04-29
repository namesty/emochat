import { Auth } from "./auth"
import { User } from "../../user/domain/user"

export class AuthService {
  isAuthenticated(): boolean {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
  
    return (!!user && !!token)
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    //TODO: navigate to login from here?
  }

  getFromStorage (): Auth | null {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if(!user || !token) {
      //TODO: navigate to login from here maybe?
      return null
    } else {

      const parsedUser: User = JSON.parse(user)

      return {
        user: parsedUser,
        token
      }
    }
  }
}