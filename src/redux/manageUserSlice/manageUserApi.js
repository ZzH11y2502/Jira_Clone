import https from "../../service/api";

export const manageUserApi = async () => {
  try {
    const result = await https.get("/api/Users/getUser");
    console.log(result, "success getting user");
    return result;
  } catch {
    console.log("Error getting user");
  }
};

export const deleteUserApi = async (userId) => {
  try {
    const result = await https.delete(`api/Users/deleteUser?id=${userId}`);
    console.log("Delete user successfully", result);
    return result;
  } catch {
    throw new Error("Failed to delete the user");
  }
};

export const updateUserApi = async (user) => {
  try {
    let result = await https.put("/api/Users/editUser", user);
    console.log("🚀 ~ UpdateUserApi ~ result:", result);
    return result;
  } catch {
    throw new Error("Failed to update the user");
  }
};
