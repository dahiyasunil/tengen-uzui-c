import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

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

const getUserId = (state) => {
  const userId = state().user.user?._id || state().user.user?.user?._id;
  if (!userId) {
    throw new Error(
      "User ID is missing in the state. Please ensure the user is logged in.",
    );
  }
  return userId;
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (mobileNumber) => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/user/login/${mobileNumber}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error login user:", err);
      throw err;
    }
  },
);

export const getWishlistItems = createAsyncThunk(
  "user/getWishlistItems",
  async (_, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.get(
        `${serverUrl}/api/user/wishlist/details/${userId}`,
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching wishlist details:", err);
      throw err;
    }
  },
);

export const addToWishlist = createAsyncThunk(
  "user/addToWishlist",
  async (productObjId, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.put(`${serverUrl}/api/user/wishlist/add`, {
        userId,
        productObjId,
      });
      return response.data;
    } catch (err) {
      console.error("Error adding item to wishlist:", err);
      throw err;
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "user/removeFromWishlist",
  async (productObjId, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.put(
        `${serverUrl}/api/user/wishlist/remove`,
        {
          userId,
          productObjId,
        },
      );
      return response.data;
    } catch (err) {
      console.error("Error removing item from wishlist:", err);
      throw err;
    }
  },
);

export const addItemToCartThunk = createAsyncThunk(
  "user/addItemToCart",
  async (itemData, { getState }) => {
    try {
      const userId = getUserId(getState);

      const existingItem = getState().user.user.bag.findIndex(
        (item) =>
          item.item === itemData.productObjId && item.size === itemData.size,
      );
      if (existingItem === -1) {
        const response = await axios.put(`${serverUrl}/api/user/cart/add`, {
          userId,
          itemData,
        });
        return response.data;
      }
      return null;
    } catch (err) {
      console.error("Error adding item to cart:", err);
      throw err;
    }
  },
);

export const removeItemFromCartThunk = createAsyncThunk(
  "user/removeItemFromCart",
  async (itemData, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.put(`${serverUrl}/api/user/cart/remove`, {
        userId,
        itemData,
      });
      return response.data;
    } catch (err) {
      console.error("Error removing item from cart:", err);
      throw err;
    }
  },
);

export const clearCartThunk = createAsyncThunk(
  "user/clearCart",
  async (_, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.put(`${serverUrl}/api/user/cart/clear`, {
        userId,
      });
      return response.data;
    } catch (err) {
      console.error("Error clearing items from cart:", err);
      throw err;
    }
  },
);

export const getCartItems = createAsyncThunk(
  "user/getCartDetails",
  async (_, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.get(
        `${serverUrl}/api/user/cart/details/${userId}`,
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching cart items:", err);
      throw err;
    }
  },
);

export const updatedItemQuantityThunk = createAsyncThunk(
  "user/updatedItemQuanity",
  async ({ productObjId, quantity }, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.put(
        `${serverUrl}/api/user/cart/item/quantity`,
        {
          userId,
          productObjId,
          quantity,
        },
      );
      return response.data;
    } catch (err) {
      console.error("Error updating item quantity:", err);
      throw err;
    }
  },
);

export const updateUserPersonalDetails = createAsyncThunk(
  "user/updatePersonalInfo",
  async (payload, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.put(`${serverUrl}/api/user/update/details`, {
        userId,
        payload,
      });
      return response.data;
    } catch (err) {
      console.error("Error updating user personal details:", err);
      throw err;
    }
  },
);

export const getAddressesThunk = createAsyncThunk(
  "user/getAddresses",
  async (_, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.get(
        `${serverUrl}/api/user/addresses/${userId}`,
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching user addresses:", err);
      throw err;
    }
  },
);

export const addAddressThunk = createAsyncThunk(
  "user/addAddress",
  async (payload, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.post(`${serverUrl}/api/user/address`, {
        userId,
        payload,
      });
      return response.data;
    } catch (err) {
      console.error("Error adding user address:", err);
      throw err;
    }
  },
);

export const editAddressThunk = createAsyncThunk(
  "user/editAddress",
  async (payload, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.put(`${serverUrl}/api/user/address`, {
        userId,
        payload,
      });
      return response.data;
    } catch (err) {
      console.error("Error editing user address:", err);
      throw err;
    }
  },
);

export const removeAddressThunk = createAsyncThunk(
  "user/removeAddress",
  async (addressObjId, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.delete(`${serverUrl}/api/user/address`, {
        params: {
          userId,
          addressObjId,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error removing user address:", err);
      throw err;
    }
  },
);

export const placeOrder = createAsyncThunk(
  "user/processOrder",
  async (deliveryAddress, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.post(`${serverUrl}/api/user/placeOrder`, {
        userId,
        deliveryAddress,
      });
      return response.data;
    } catch (err) {
      console.error("Error while placing user order:", err);
      throw err;
    }
  },
);

export const getOrders = createAsyncThunk(
  "user/orders",
  async (_, { getState }) => {
    try {
      const userId = getUserId(getState);
      const response = await axios.get(`${serverUrl}/api/user/orders`, {
        params: {
          userId,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching order details:", err);
      throw err;
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
    addItemToCartAction: (state, action) => {
      const itemIndex = state.user.bag.findIndex(
        (item) =>
          item.item._id === action.payload.product._id &&
          item.size === action.payload.size,
      );
      if (itemIndex != -1) {
        state.user.bag[itemIndex].quantity += 1;
      } else {
        state.user.bag.push({
          item: action.payload.product,
          quantity: 1,
          size: action.payload.size,
        });
      }
    },
    removeItemFromCartAction: (state, action) => {
      state.user.bag = state.user.bag.filter((item) => {
        if (item.item._id !== action.payload.item._id) {
          return true;
        } else if (item.size !== action.payload.size) {
          return true;
        } else {
          return false;
        }
      });
    },
    updateItemQuantityAction: (state, action) => {
      const itemIndex = state.user.bag.findIndex(
        (item) =>
          item.item._id === action.payload.productObjId &&
          item.size === action.payload.size,
      );
      state.user.bag[itemIndex].quantity = action.payload.quantity;
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
    builder.addCase(addItemToCartThunk.pending, (state) => {
      state.status = "addingItemToCart";
    });
    builder.addCase(addItemToCartThunk.fulfilled, (state, action) => {
      if (action.payload != null) {
        state.status = "addedItemToCart";
        state.user.bag = action.payload.cart;
      }
    });
    builder.addCase(addItemToCartThunk.rejected, (state, action) => {
      state.status = "failedToAddToCart";
      state.error = action.payload;
    });
    builder.addCase(getCartItems.pending, (state) => {
      state.status = "fetchingCartItems";
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.status = "cartItemsRetrived";
      state.user.bag = action.payload.cart;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.status = "failedToFetchCartItems";
      state.error = action.payload;
    });
    builder.addCase(removeItemFromCartThunk.pending, (state) => {
      state.status = "removingFromCart";
    });
    builder.addCase(removeItemFromCartThunk.fulfilled, (state, action) => {
      state.status = "removedFromCart";
      state.user.bag = action.payload.cart;
    });
    builder.addCase(removeItemFromCartThunk.rejected, (state, action) => {
      state.status = "failedToRemoveFromWCart";
      state.error = action.payload;
    });
    builder.addCase(clearCartThunk.pending, (state) => {
      state.status = "clearingCart";
    });
    builder.addCase(clearCartThunk.fulfilled, (state, action) => {
      state.status = "cartCleared";
      state.user.bag = action.payload.cart;
    });
    builder.addCase(clearCartThunk.rejected, (state, action) => {
      state.status = "failedToClearCart";
      state.error = action.payload;
    });
    builder.addCase(updatedItemQuantityThunk.pending, (state) => {
      state.status = "updatingItemQuanity";
    });
    builder.addCase(updatedItemQuantityThunk.fulfilled, (state, action) => {
      state.status = "quantityUpdated";
      state.user.bag = action.payload.cart;
    });
    builder.addCase(updatedItemQuantityThunk.rejected, (state, action) => {
      state.status = "failedToUpdatedQuantity";
      state.error = action.payload;
    });
    builder.addCase(updateUserPersonalDetails.pending, (state) => {
      state.status = "updatingUserInfo";
    });
    builder.addCase(updateUserPersonalDetails.fulfilled, (state, action) => {
      state.status = "userInfoUpdated";
      state.user = action.payload.user;
    });
    builder.addCase(updateUserPersonalDetails.rejected, (state, action) => {
      state.status = "failedToUpdateUserInfo";
      state.error = action.payload;
    });
    builder.addCase(getAddressesThunk.pending, (state) => {
      state.status = "fetchingAllAddresses";
    });
    builder.addCase(getAddressesThunk.fulfilled, (state, action) => {
      state.status = "fetchedAllAddresses";
      state.user.addresses = action.payload.addresses;
    });
    builder.addCase(getAddressesThunk.rejected, (state, action) => {
      state.status = "failedToFetchAddresses";
      state.error = action.payload;
    });
    builder.addCase(addAddressThunk.pending, (state) => {
      state.status = "savingAddress";
    });
    builder.addCase(addAddressThunk.fulfilled, (state, action) => {
      state.status = "addressSaved";
      state.user.addresses = action.payload.addresses;
    });
    builder.addCase(addAddressThunk.rejected, (state, action) => {
      state.status = "failedToSaveAddress";
      state.error = action.payload;
    });
    builder.addCase(removeAddressThunk.pending, (state) => {
      state.status = "removingAddress";
    });
    builder.addCase(removeAddressThunk.fulfilled, (state, action) => {
      state.status = "addressRemoved";
      state.user.addresses = action.payload.addresses;
    });
    builder.addCase(removeAddressThunk.rejected, (state, action) => {
      state.status = "failedToRemoveAddress";
      state.error = action.payload;
    });
    builder.addCase(editAddressThunk.pending, (state) => {
      state.status = "updatingAddress";
    });
    builder.addCase(editAddressThunk.fulfilled, (state, action) => {
      state.status = "addressUpdated";
      state.user.addresses = action.payload.addresses;
    });
    builder.addCase(editAddressThunk.rejected, (state, action) => {
      state.status = "failedToUpdateAddress";
      state.error = action.payload;
    });
    builder.addCase(placeOrder.pending, (state) => {
      state.status = "placingOrder";
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.status = "orderPlacedSuccessfully";
      state.user.orders = action.payload.orders;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.status = "failedToplaceOrder";
      state.error = action.payload;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.status = "fetchingOrders";
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.status = "ordersFetched";
      state.user.orders = action.payload.orders;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.status = "failedToFetchOrders";
      state.error = action.payload;
    });
  },
});

export const {
  resetStatus,
  addItemToCartAction,
  removeItemFromCartAction,
  updateItemQuantityAction,
} = userSlice.actions;
export default userSlice.reducer;
