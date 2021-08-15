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

export const getUser = createAsyncThunk("user/getUser", async (data) => {
  try {
    const response = await fetch(Server + "user/get_user?id=" + data, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("vToken"),
      },
    });

    if (!response.ok) {
      const errData = await response.text();
      alert(errData);
      window.location.href = "/";
    } else {
      const userData = await response.json();
      return userData;
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
      localStorage.setItem("vToken", payload.token);
      localStorage.setItem("userID", payload.result._id);
      state.token = payload.token;
      state.user = payload.result;
      window.location.href="/" + payload.result._id;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
    }
  },
})


export default userSlice.reducer;