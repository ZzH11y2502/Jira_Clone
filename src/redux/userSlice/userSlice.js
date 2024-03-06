import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLoginApi } from "./userApi";

export const userLogin = createAsyncThunk(
  "userAccount/userLogin",
  async (userData) => {
    const result = await userLoginApi(userData);
    console.log(result, "userLogin");
    return result;
  }
);

export const userSlice = createSlice({
  name: "userAccount",
  initialState: {
    userAccount: [],
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log("Login successful", action.payload.content);
      const dataJson = JSON.stringify(action.payload.content);
      localStorage.setItem("USER_INFO", dataJson);
    });
  },
});

export default userSlice.reducer;
