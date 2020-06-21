import dotenv from "dotenv";
import { User } from "../../user/domain/user";
import { Message } from "./message";

dotenv.config();

if (!process.env.REACT_APP_TEST_USER) {
  throw new Error("Test user must be set in .env file");
}

const testUser: User = JSON.parse(process.env.REACT_APP_TEST_USER);
const jestUser: User = {
  name: "JestTest1",
  lastName: "JestTest1",
  email: "jesttest@gmail.com",
  id: "100",
};

export class MessageMother {
  static testMessage(): Message {
    return {
      id: "25",
      from: jestUser,
      date: Date.now().toString(),
      content: "Socket message",
      to: testUser,
    };
  }
}
