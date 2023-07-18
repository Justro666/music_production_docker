import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'loggedIn',
  initialState: {
    value: false,
  },
  reducers: {
    login: (state, { type, payload }) => {
      state.value = payload;
    },
    logout: (state, { type, payload }) => {
      state.value = payload;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
