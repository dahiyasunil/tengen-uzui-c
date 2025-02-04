import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const loginUser = createAsyncThunk(
  "user/login",
  async (mobileNumber) => {
    const response = await axios.get(
      `${serverUrl}/api/user/login/${mobileNumber}`,
    );
    return response.data;
  },
);

export const getWishlistItems = createAsyncThunk(
  "user/getWishlistItems",
  async (_, { getState }) => {
    const userId = getState().user.user._id || getState().user.user.user._id;

    const response = await axios.get(
      `${serverUrl}/api/user/wishlist/details/${userId}`,
    );
    return response.data;
  },
);

export const addToWishlist = createAsyncThunk(
  "user/addToWishlist",
  async (productObjId, { getState }) => {
    const userId = getState().user.user._id || getState().user.user.user._id;
    const response = await axios.put(`${serverUrl}/api/user/wishlist/add`, {
      userId,
      productObjId,
    });
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
    builder.addCase(addToWishlist.pending, (state) => {
      state.status = "addingToWishlist";
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.status = "addedToWishList";
      state.user = action.payload;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.status = "failedToWishlist";
      state.error = action.payload;
    });
    builder.addCase(getWishlistItems.pending, (state) => {
      state.status = "fetchingWishlistItems";
    });
    builder.addCase(getWishlistItems.fulfilled, (state, action) => {
      state.status = "wishlistItemsRetrived";
      state.user.wishlist = action.payload.wishlist;
    });
    builder.addCase(getWishlistItems.rejected, (state, action) => {
      state.status = "failedToFetchWishlistItems";
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
