import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    user: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUser } = userSlice.actions;

export default userSlice.reducer;