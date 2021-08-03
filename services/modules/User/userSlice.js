import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Server from "../../../config/Server";


const initialState = {
    token: null,
    user: {},
};

//Thunks
export const authUser = createAsyncThunk("user/authUser", async (data) => {
  try {
    const response = await fetch(Server + "user/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: data.email,
          password: data.password,
      }),
    });

    if (!response.ok) {
      console.log("got here");
      const errData = await response.text();
      alert(errData);
    } else {
      const resData = await response.json();
      return resData;
    }
  } catch (err) {
    throw err;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [authUser.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.result;
    }
  },
})


export default userSlice.reducer;