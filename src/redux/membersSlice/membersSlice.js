import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMemberApi, membersApi } from "./membersApi";

export const getMembersAction = createAsyncThunk(
  "getAllMembers/getMembersAction",
  () => {
    const result = membersApi();
    console.log(result, "userLogin");
    return result;
  }
);

export const addMemberAction = createAsyncThunk(
  "getAllMembers/addMemberAction",
  async (data) => {
    const result = await addMemberApi(data);
    console.log(result, "Add member");
    if (!result.success) throw new Error(result.message);
  }
);

export const membersSlice = createSlice({
  name: "getAllMembers",
  initialState: {
    membersList: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembersAction.fulfilled, (state, action) => {
        console.log("All members are available", action.payload.content);
        state.membersList = action.payload.content.slice(0, 20);
        console.log("Update members list", state.membersList);
        //   return [...state.membersList];
      })
      .addCase(addMemberAction.fulfilled, (state, action) => {
        console.log("All members are available", action.payload.content);
      });
  },
});

export default membersSlice.reducer;
