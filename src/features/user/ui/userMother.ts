import dotenv from 'dotenv'
import { User } from '../domain/user'

dotenv.config()

if(!process.env.REACT_APP_TEST_USER) {
  throw new Error('Test user must be set in .env file')
}

const testUsers: User[] = [{
  name: 'JestTest2',
  lastName: 'JestTest2',
  email: 'jesttest2@gmail.com',
  id: '102'
},
{
  name: 'JestTest3',
  lastName: 'JestTest3',
  email: 'jesttest3@gmail.com',
  id: '103'
}]

export class UserMother {
  static userList(): User[] {
    return testUsers
  }
}