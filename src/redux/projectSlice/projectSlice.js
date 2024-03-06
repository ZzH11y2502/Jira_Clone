import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProjectApi,
  deleteProjectApi,
  getAllProjectsApi,
  updateProjectApi,
} from "./projectApi";

export const getAllProject = createAsyncThunk(
  "projectSlice/getAllProject",
  async () => {
    try {
      const response = await getAllProjectsApi();

      // Extract only serializable data
      const serializableData = {
        content: response.data.content, // Assuming 'content' is serializable
        // Add more serializable properties as needed
      };

      return serializableData;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error; // Re-throw the error to be handled by the rejected action
    }
  }
);
export const addNewProject = createAsyncThunk(
  "projectSlice/addNewProject",
  async (formData) => {
    const result = await createProjectApi(formData);
    return result;
  }
);

export const deleteProject = createAsyncThunk(
  "projectSlice/deleteProject",
  async (id) => {
    try {
      const response = await deleteProjectApi(id);
      const serializableData = {
        content: response.data.content, // Assuming 'content' is serializable
        // Add more serializable properties as needed
      };

      return serializableData;
    } catch (error) {
      console.log(
        error // Adjust this based on your error handling
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "projectSlice/updateProject",
  async (project) => {
    try {
      const response = await updateProjectApi(project);
      const serializableData = {
        content: response.data.content, // Assuming 'content' is serializable
        // Add more serializable properties as needed
      };

      return serializableData;
    } catch {
      throw new Error("Error updating the Project");
    }
  }
);

export const projectSlice = createSlice({
  name: "projectSlice",
  initialState: {
    projectList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProject.fulfilled, (state, action) => {
        console.log("Fulfilled:", action.payload.data.content);
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        console.log(action?.payload?.content, "action payload");
        state.projectList = action?.payload?.content;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        console.log("Fulfilled:", action?.payload?.content);
        console.log("Removed:", state.projectList);
        const newProjectList = state.projectList.filter(
          (project) => project.id !== action.payload.content
        );
        state.projectList = [...newProjectList];
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        console.log("Updated Project: ", action?.payload);
      });
  },
});

export const { reducer } = projectSlice;
export default reducer;
