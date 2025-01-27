import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

// Thunk functions for client-side auth
export const fetchProjectsAsync = createAsyncThunk(
  "fetch/projects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/projects");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewProjectAsync = createAsyncThunk(
  "create/projects",
  async (projectDetails, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/projects", projectDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for authSlice
const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectsAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchProjectsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = action.payload.projects;
    });

    builder.addCase(fetchProjectsAsync.rejected, (state) => {
      state.status = "error";
      state.error = "Failed to signup new user";
    });

    builder.addCase(addNewProjectAsync.fulfilled, (state, action) => {
      state.projects = [...state.projects, action.payload.savedProject];
    });
  },
});

export default projectsSlice.reducer;
