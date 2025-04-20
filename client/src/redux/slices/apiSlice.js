import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URI + "/api",
  credentials: "include",
});

const baseQueryWithAuthHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  //   // Optional: Skip redirect if login or register endpoints
  const skipRedirect = [
    "/user/login", // update according to your login endpoint
    "/user/register",
  ].some((path) => typeof args.url === "string" && args.url.includes(path));

  // Check for recent login — give a grace period
  const justLoggedIn = localStorage.getItem("justLoggedIn");
  const loginTime = justLoggedIn ? Number(justLoggedIn) : null;
  const withinGracePeriod = loginTime && Date.now() - loginTime < 3000; // 3s grace

  if (!skipRedirect && result?.error?.status === 401 && !withinGracePeriod) {
    // console.warn("First request failed with 401, retrying once...");
    // result = await baseQuery(args, api, extraOptions);

    // After retry, if still fails
    if (result?.error?.status === 401) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("justLoggedIn"); // clean up
      window.location.href = "/log-in";
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
