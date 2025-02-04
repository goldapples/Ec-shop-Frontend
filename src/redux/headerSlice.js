import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getACart = createAsyncThunk(
  "/api/product/getAllCart",
  async (payload) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/product/getACart`
      );
      return await res.data;
    } catch (e) {
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    pageTitle: "Dashboard", // current page title state management
    noOfNotifications: 0, // no of unread notifications
    newNotificationMessage: "", // message of notification to be shown
    newNotificationStatus: -1, // to check the notification type -  success/ error/ info
    count: 0,
    error: "",
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload.title;
    },

    removeNotificationMessage: (state, action) => {
      state.newNotificationMessage = "";
      state.newNotificationStatus = -1;
    },

    showNotification: (state, action) => {
      state.newNotificationMessage = action.payload.message;
      state.newNotificationStatus = action.payload.status;
    },
  },

  extraReducers: {
    [getACart.fulfilled]: (state, { payload }) => {
      payload.count ? (state.count = payload.count) : (state.count = 0);
    },

    [getACart.rejected]: (state, { payload }) => {
      state.error = payload.message;
    },
  },
});

export const { setPageTitle, removeNotificationMessage, showNotification } =
  headerSlice.actions;

export default headerSlice.reducer;
