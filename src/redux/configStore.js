import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import projectSlice from "./projectSlice/projectSlice";
import membersSlice from "./membersSlice/membersSlice";
import managementUserSlice from "./manageUserSlice/manageUserSlice";
export const store = configureStore({
  reducer: {
    userLogin: userSlice,
    addNewProject: projectSlice,
    getAllProject: projectSlice,
    deleteProject: projectSlice,
    updateProject: projectSlice,
    getMembersAction: membersSlice,
    addMemberAction: membersSlice,
    getUserAction: managementUserSlice,
    deleteUserAction: managementUserSlice,
    updateUserAction: managementUserSlice,
  },
});
