import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';
import { AuthState, Login } from 'interfaces';
import axios from 'utils/axios';
const authUrl = process.env.REACT_APP_URL_AUTH_API;

const initialState: AuthState = {
  accessToken: null,
  isLoading: false,
  dataUser: {
      email: "",
      password: ""
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setDataUser: (state, action: PayloadAction<Login>) => {
      state.dataUser = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setAccessToken, setIsLoading, setDataUser } = authSlice.actions;

export default authSlice.reducer;


export const login = createAsyncThunk<AxiosResponse, Login>(
  'auth/login',
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    try {
      const response: AxiosResponse = await axios.request({
        url: authUrl,
        method: 'POST',
        data,
      });
      dispatch(setAccessToken(response.data.token));
      dispatch(setDataUser(data));
      localStorage.setItem('accessToken', response.data.token);
      return response;
    } catch (error) {
      alert('Error al ingresar');
      return rejectWithValue(error as AxiosError);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setAccessToken(""));
    dispatch(setIsLoading(false));
  }
};