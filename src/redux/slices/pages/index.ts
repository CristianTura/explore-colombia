import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thunk } from 'redux/store';
import axios from 'utils/axios';
import {  AppDispatch } from 'redux/store'; 
import { AxiosError, AxiosResponse } from 'axios';
import { PagedTable } from '../dashboard';

export interface PagesState {
  isLoading: boolean;
  dataCities: DataCities[] | null;
  pagedCities: PagedTable | null;
  dataPresidents: DataPresidents[] | null;
  pagedPresidents: PagedTable | null;
  touristicAttraction: DataTouristicAttraction[] | null;
  pagedTouristicAttraction: PagedTable | null;
  touristicByDepartment: DataTouristicAttraction[] | null;
}

export interface DataCities {
  id?: number | string;
  name: string;
  surface?: string;
  population: number;
  postalCode?: string;
}

export interface DataPresidents {
  id?: number | string;
  name?: string;
  lastName: string;
  startPeriodDate: number;
  endPeriodDate?: string;
  politicalParty?: string;
}

export interface DataTouristicAttraction {
  id?: number | string;
  name?: string;
  images?: string[];
  description?: string;
}


const initialState: PagesState = {
  isLoading: false,
  dataCities: null,
  pagedCities: null,
  dataPresidents: null,
  pagedPresidents: null,
  touristicAttraction: null,
  pagedTouristicAttraction: null,
  touristicByDepartment: null,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDataCities: (state, action: PayloadAction<DataCities[]>) => {
      state.dataCities = action.payload;
    },
    setPagedCities: (state, action: PayloadAction<PagedTable>) => {
      state.pagedCities = action.payload;
    },
    setDataPresidents: (state, action: PayloadAction<DataPresidents[]>) => {
      state.dataPresidents = action.payload;
    },
    setPagedPresidents: (state, action: PayloadAction<PagedTable>) => {
      state.pagedPresidents = action.payload;
    },
    setTouristicAttraction: (state, action: PayloadAction<DataTouristicAttraction[]>) => {
      state.touristicAttraction = action.payload;
    },
    setPagedTouristicAttraction: (state, action: PayloadAction<PagedTable>) => {
      state.pagedTouristicAttraction = action.payload;
    },
    setTouristicByDepartment: (state, action: PayloadAction<DataTouristicAttraction[]>) => {
      state.touristicByDepartment = action.payload;
    },
  }
  
});

export const { 
  setIsLoading, setDataCities, setPagedCities, setDataPresidents, setPagedPresidents,
  setPagedTouristicAttraction, setTouristicAttraction, setTouristicByDepartment
 } = pagesSlice.actions;

export const getCitiesDataPaged =
  (page: number, numPages: number): Thunk<AxiosResponse | AxiosError> =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response: AxiosResponse = await axios.get(`/City/pagedList?Page=${page}&PageSize=${numPages}`);
      dispatch(setDataCities(response.data.data));
      const paged = {
        page: response.data.page,
        pageSize: response.data.pageSize,
        totalRecords: response.data.totalRecords,
        pageCount: response.data.pageCount,
      }
      dispatch(setPagedCities(paged));

      return response;
    } catch (error) {
      return error as AxiosError;
    } finally {
      dispatch(setIsLoading(false));
    }
};

export const getPresidentsPaged =
  (page: number, numPages: number): Thunk<AxiosResponse | AxiosError> =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response: AxiosResponse = await axios.get(`/President/pagedList?Page=${page}&PageSize=${numPages}`);
      dispatch(setDataPresidents(response.data.data));
      const paged = {
        page: response.data.page,
        pageSize: response.data.pageSize,
        totalRecords: response.data.totalRecords,
        pageCount: response.data.pageCount,
      }
      dispatch(setPagedPresidents(paged));

      return response;
    } catch (error) {
      return error as AxiosError;
    } finally {
      dispatch(setIsLoading(false));
    }
};

export const getTouristicAttractionPaged =
  (page: number, numPages: number): Thunk<AxiosResponse | AxiosError> =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response: AxiosResponse = await axios.get(`/TouristicAttraction/pagedList?Page=${page}&PageSize=${numPages}`);
      dispatch(setTouristicAttraction(response.data.data));
      const paged = {
        page: response.data.page,
        pageSize: response.data.pageSize,
        totalRecords: response.data.totalRecords,
        pageCount: response.data.pageCount,
      }
      dispatch(setPagedTouristicAttraction(paged));

      return response;
    } catch (error) {
      return error as AxiosError;
    } finally {
      dispatch(setIsLoading(false));
    }
};

export const getTouristicAttractionByDepartment =
  (idDepartment: number | string): Thunk<AxiosResponse | AxiosError> =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response: AxiosResponse = await axios.get(`/Department/${idDepartment}/touristicattractions`);
      dispatch(setTouristicByDepartment(response.data));
      return response;
    } catch (error) {
      return error as AxiosError;
    } finally {
      dispatch(setIsLoading(false));
    }
};


export default pagesSlice.reducer;
