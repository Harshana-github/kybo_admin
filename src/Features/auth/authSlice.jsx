import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./authThunk";

const Kybo = localStorage.getItem("Kybo");
const KyboAuthObject = Kybo && JSON.parse(Kybo);
const user = KyboAuthObject && KyboAuthObject.user;
const token = KyboAuthObject && KyboAuthObject.token;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user || null,
    token: token || null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.loading = false;
        state.user = user;
        state.token = token.original.access_token;
        localStorage.setItem(
          "Kybo",
          JSON.stringify({
            user: user,
            token: token.original.access_token,
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("Kybo");
      });
  },
});

export default authSlice.reducer;
