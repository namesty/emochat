import { AxiosStatic } from "axios";

if (!process.env.REACT_APP_TEST_TOKEN || !process.env.REACT_APP_TEST_USER) {
  throw new Error("Need to set test token and test user in .env file");
}

localStorage.setItem("token", process.env.REACT_APP_TEST_TOKEN);
localStorage.setItem("user", process.env.REACT_APP_TEST_USER);

const mockAxios = jest.genMockFromModule<AxiosStatic>('axios')

mockAxios.create = jest.fn(() => mockAxios)

export default mockAxios
