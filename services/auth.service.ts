import { AxiosRequestConfig } from "axios";

import { SignupInput } from "../lib/auth.lib";
import fetchFromAPI from "../lib/axios.lib";

function fetchFromAuth(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/auth/${URL}`, config);
}

export async function signup(input: SignupInput) {
  var response = await fetchFromAuth("signup", { data: input, method: "POST" });
  if (response.statusCode == 201) {
    return {
      success: response.success,
      message: response.data.message,
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { success: false };
}