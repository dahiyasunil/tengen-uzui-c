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
    console.log("Adding to wishlist");
    const userId = getState().user.user._id || getState().user.user.user._id;
    const response = await axios.put(`${serverUrl}/api/user/wishlist/add`, {
      userId,
      productObjId,
    });
    return response.data;
  },
);

export const removeFromWishlist = createAsyncThunk(
  "user/removeFromWishlist",
  async (productObjId, { getState }) => {
    console.log("Removing from wishlist");

    const userId = getState().user.user._id || getState().user.user.user._id;
    const response = await axios.put(`${serverUrl}/api/user/wishlist/remove`, {
      userId,
      productObjId,
    });
    return response.data;
  },
);

const user = {
  mobileNumber: null,
  name: "",
  emailId: "",
  addresses: [],
  wishlist: [],
  bag: [],
  orders: [],
};

const initialState = {
  user,
  loggedIn: false,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addItemToCartAction: (state, action) => {
      const itemIndex = state.user.bag.findIndex(
        (item) => item.item._id === action.payload._id,
      );
      if (itemIndex != -1) {
        const quantity = state.user.bag[itemIndex].quantity + 1;
        state.user.bag[itemIndex] = { item: action.payload, quantity };
      } else {
        state.user.bag.push({ item: action.payload, quantity: 1 });
      }
    },
  },
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
      state.user.wishlist = action.payload.wishlist;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.status = "failedToWishlist";
      state.error = action.payload;
    });
    builder.addCase(removeFromWishlist.pending, (state) => {
      state.status = "removingFromWishlist";
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.status = "removedFromWishList";
      state.user.wishlist = action.payload.wishlist;
    });
    builder.addCase(removeFromWishlist.rejected, (state, action) => {
      state.status = "failedToRemoveFromWishlist";
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

export const { addItemToCartAction } = userSlice.actions;
export default userSlice.reducer;
