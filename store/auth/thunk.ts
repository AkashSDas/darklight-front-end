import toast from "react-hot-toast";
import { completeOAuthSignupService, ICompleteOAuthSignupPayload, ISignupPayload, signupService } from "services/auth";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { authSliceName } from "./slice";

export var signupThunk = createAsyncThunk(
  `${authSliceName}/signup`,
  async function (payload: ISignupPayload) {
    var response = await signupService(payload);
    if (response.success) toast.success(response.msg);
    else toast.error(response.msg);
  }
);

export var completeOAuthSignupThunk = createAsyncThunk(
  `${authSliceName}/complete-oauth`,
  async function (payload: ICompleteOAuthSignupPayload) {
    var response = await completeOAuthSignupService(payload);
    if (response.success) toast.success(response.msg);
    else toast.error(response.msg);
  }
);
