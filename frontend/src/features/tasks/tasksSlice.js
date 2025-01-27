import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

// Thunk functions for client-side auth
export const fetchTasksAsync = createAsyncThunk(
  "fetch/tasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/tasks");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for authSlice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchTasksAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = action.payload.tasks;
    });

    builder.addCase(fetchTasksAsync.rejected, (state) => {
      state.status = "error";
      state.error = "Failed to fetch tasks";
    });

    builder.addCase(loginUserAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });

    builder.addCase(loginUserAsync.rejected, (state) => {
      state.status = "error";
      state.error = "Failed to login";
    });
  },
});

export default tasksSlice.reducer;
