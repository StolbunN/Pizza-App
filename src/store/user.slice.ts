import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../store/storage";
import axios, { AxiosError } from "axios";
import { ILoginResponse } from "../interfaces/auth.interface";
import { PREFIX } from "../helpers/API";

export const JWT_PERSISTENT_STATE = "userData";

export interface IUserPersistentState {
  jwt: string | null;
}

export interface IUserState {
  jwt: string | null;
  loginErrorMessage?: string
}

const initialState: IUserState = {
  jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
}

export const login = createAsyncThunk(
  "user/login",
  async (params: {email: string, password: string}) => {
    try {
      const {data} = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password
      })
      return data;
    } catch(error) {
      if(error instanceof AxiosError) {
        throw new Error(error.response?.data.message)
      }
    }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if(!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action);
      state.loginErrorMessage = action.error.message
    })
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;