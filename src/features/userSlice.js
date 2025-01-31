import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const loginUser = createAsyncThunk(
  "user/login",
  async (mobileNumber) => {
    const response = await axios.get(`${serverUrl}/api/user/${mobileNumber}`);
    return response.data;
  },
);

const initialState = {
  user: null,
  loggedIn: false,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "verifyingUser";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "loginSuccessful";
      state.loggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "loginFailed";
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
