import https from "../../service/api";

export const membersApi = async () => {
  try {
    const result = await https.get("/api/Users/getUser");
    console.log(result);
    return result.data;
  } catch (err) {
    console.log("Error  login", err);
  }
};

export const addMemberApi = async (item) => {
  try {
    const result = await https.post("/api/Project/assignUserProject", item);
    console.log(result);
    return result.data;
  } catch (err) {
    console.log("Error  login", err);
  }
};
