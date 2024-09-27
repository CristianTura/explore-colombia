import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thunk } from 'redux/store';
import axios from 'utils/axios';
import {  AppDispatch } from 'redux/store'; 
import { AxiosError, AxiosResponse } from 'axios';
import { DashboardState, DataCountry, DataDepartment, PagedTable } from 'interfaces';


const initialState: DashboardState = {
  isLoading: false,
  dataCountry: null,
  departments: null,
  pagedDepartments: null,
};

const settingsSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDataCountry: (state, action: PayloadAction<DataCountry>) => {
      state.dataCountry = action.payload;
    },
    setDataDepartment: (state, action: PayloadAction<DataDepartment[]>) => {
      state.departments = action.payload;
    },
    setPagedDepartment: (state, action: PayloadAction<PagedTable>) => {
      state.pagedDepartments = action.payload;
    },
  }
  
});

export const { setIsLoading, setDataCountry, setDataDepartment, setPagedDepartment } = settingsSlice.actions;

export const getGeneralData =
  (): Thunk<AxiosResponse | AxiosError> =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response: AxiosResponse = await axios.get('/Country/Colombia');
      dispatch(setDataCountry(response.data));

      return response;
    } catch (error) {
      return error as AxiosError;
    } finally {
      dispatch(setIsLoading(false));
    }
};

export const getDepartmentsData =
  (): Thunk<AxiosResponse | AxiosError> =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response: AxiosResponse = await axios.get('/Department');
      dispatch(setDataDepartment(response.data));

      return response;
    } catch (error) {
      return error as AxiosError;
    } finally {
      dispatch(setIsLoading(false));
    }
};

export const getDepartmentsDataPaged =
  (page: number, numPages: number): Thunk<AxiosResponse | AxiosError> =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response: AxiosResponse = await axios.get(`/Department/pagedList?Page=${page}&PageSize=${numPages}`);
      dispatch(setDataDepartment(response.data.data));
      const paged = {
        page: response.data.page,
        pageSize: response.data.pageSize,
        totalRecords: response.data.totalRecords,
        pageCount: response.data.pageCount,
      }
      dispatch(setPagedDepartment(paged));

      return response;
    } catch (error) {
      return error as AxiosError;
    } finally {
      dispatch(setIsLoading(false));
    }
};


export default settingsSlice.reducer;
