import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";
import { emailAvailabilityCheckThunk, getUserOAuthInfoThunk, instructorSignupThunk, usernameAvailabilityCheckThunk } from "./thunk";

export interface User {
  id: string;
  fullName?: string;
  username?: string;
  email?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  roles: ("student" | "instructor" | "admin")[];
  createdAt: string;
  profileImage?: { id?: string; URL: string };
  oauthProviders: {
    id: string;
    provider: "google" | "facebook" | "twitter";
  };
}

export interface UserState {
  isUsernameAvailable: boolean;
  checkingUsernameAvailable: boolean;
  isEmailAvailable: boolean;
  checkingEmailAvailable: boolean;
  instructorSignupLoading: boolean;

  data: User | null;
  fetchingOAuthInfo: boolean;
}

var initialState: UserState = {
  isUsernameAvailable: false,
  checkingUsernameAvailable: false,
  isEmailAvailable: false,
  checkingEmailAvailable: false,
  data: null,
  fetchingOAuthInfo: false,
  instructorSignupLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAvailability(
      state: UserState,
      action: PayloadAction<{ value: boolean; field: "username" | "email" }>
    ) {
      if (action.payload.field == "username") {
        state.isUsernameAvailable = action.payload.value;
      } else if (action.payload.field == "email") {
        state.isEmailAvailable = action.payload.value;
      }
    },
    updateUser(state: UserState, action: PayloadAction<UserState["data"]>) {
      state.data = action.payload;
    },
    clearUser(state: UserState) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    // Username availability loading
    builder.addCase(usernameAvailabilityCheckThunk.pending, (state) => {
      state.checkingUsernameAvailable = true;
    });
    builder.addCase(usernameAvailabilityCheckThunk.fulfilled, (state) => {
      state.checkingUsernameAvailable = false;
    });
    builder.addCase(usernameAvailabilityCheckThunk.rejected, (state) => {
      state.checkingUsernameAvailable = false;
    });

    // Email availability loading
    builder.addCase(emailAvailabilityCheckThunk.pending, (state) => {
      state.checkingEmailAvailable = true;
    });
    builder.addCase(emailAvailabilityCheckThunk.fulfilled, (state) => {
      state.checkingEmailAvailable = false;
    });
    builder.addCase(emailAvailabilityCheckThunk.rejected, (state) => {
      state.checkingEmailAvailable = false;
    });

    // Fetching user OAuth info
    builder.addCase(getUserOAuthInfoThunk.pending, (state) => {
      state.fetchingOAuthInfo = true;
    });
    builder.addCase(getUserOAuthInfoThunk.fulfilled, (state) => {
      state.fetchingOAuthInfo = false;
    });
    builder.addCase(getUserOAuthInfoThunk.rejected, (state) => {
      state.fetchingOAuthInfo = false;
    });

    // Instructor loading
    builder.addCase(instructorSignupThunk.pending, (state) => {
      state.instructorSignupLoading = true;
    });
    builder.addCase(instructorSignupThunk.fulfilled, (state) => {
      state.instructorSignupLoading = false;
    });
    builder.addCase(instructorSignupThunk.rejected, (state) => {
      state.instructorSignupLoading = false;
    });
  },
});

export var { userAvailability, updateUser, clearUser } = userSlice.actions;
export var selectUser = (state: RootState) => state.user;
export var userSliceName = userSlice.name;
export default userSlice.reducer;
