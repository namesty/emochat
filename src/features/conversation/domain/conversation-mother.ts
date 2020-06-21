import { Conversation } from "./conversation";
import dotenv from 'dotenv'
import { User } from "../../user/domain/user";

dotenv.config()

if(!process.env.REACT_APP_TEST_USER) {
  throw new Error('Test user must be set in .env file')
}

const testUser: User = JSON.parse(process.env.REACT_APP_TEST_USER)
const jestUser: User = {
  name: 'JestTest1',
  lastName: 'JestTest1',
  email: 'jesttest@gmail.com',
  id: '100'
}

export class ConversationMother {
  static noEmotions(): Conversation[] {
    return [{
      id: '1',
      users: [jestUser, testUser],
      messages: [{
        id: '20',
        from: jestUser,
        date: Date.now().toString(),
        content: 'Hello bro',
        to: testUser
      }],
      emotions: []
    }]
  }
}