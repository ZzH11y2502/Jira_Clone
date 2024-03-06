import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserApi, deleteUserApi, manageUserApi } from "./manageUserApi";

export const getUserAction = createAsyncThunk(
  "userManagement/getUserAction",
  async () => {
    const result = await manageUserApi();
    console.log("🚀 ~ result in slice", result);
    const serializableData = {
      content: result.data.content, // Assuming 'content' is serializable
      // Add more serializable properties as needed
    };
    return serializableData;
  }
);

export const deleteUserAction = createAsyncThunk(
  "userManagement/deleteUserAction",
  async (userId) => {
    const result = await deleteUserApi(userId);
    console.log("🚀 ~ result in slice", result);
    const serializableData = {
      content: result.data.content, // Assuming 'content' is serializable
    };
    return serializableData;
  }
);

export const updateUserAction = createAsyncThunk(
  "userManagement/updateUserAction",
  async (user) => {
    const result = await updateUserApi(user);
    console.log("🚀 ~ result in slice", result);
    const serializableData = {
      content: result.data.content, // Assuming 'content' is serializable
    };
    return serializableData;
  }
);

export const managementUserSlice = createSlice({
  name: "userManagement",
  initialState: {
    userList: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAction.fulfilled, (state, action) => {
        console.log(
          "get users list successful",
          action.payload.content.slice(0, 30)
        );
        state.userList = action.payload.content.slice(0, 30);
        console.log(state.userList);
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        console.log(action.payload.content, "Update user");
      });
  },
});

export default managementUserSlice.reducer;
