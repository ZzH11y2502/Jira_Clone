import https from "../../service/api";
import { https_test } from "../../service/api_test";

export const userLoginApi = async (userAcount) => {
  try {
    const result = await https_test.post("/api/Users/signin", userAcount);
    console.log(result);
    return result.data;
  } catch (err) {
    console.log("Error  login", err);
  }
};
