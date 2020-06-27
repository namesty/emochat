import { Emotion } from "./emotion";
import dotenv from 'dotenv'
import { User } from "../../user/domain/user";

dotenv.config()

if(!process.env.REACT_APP_TEST_USER) {
  throw new Error('Test user must be set in .env file')
}

const jestUser: User = {
  name: 'JestTest1',
  lastName: 'JestTest1',
  email: 'jesttest@gmail.com',
  id: '100'
}

export class EmotionMother {
  static emotions(): Emotion[] {
    return [{
      user: jestUser,
      Happy: 0.5,
      Angry: 0.4,
      Fear: 0.01,
      Bored: 0.04,
      Excited: 0.01,
      Sad: 0.04,
      date: Date.now().toString()
    }]
  }
}