import { useCustomDispatch, useCustomSelector } from "./redux";
import { DataDepartment, getDepartmentsDataPaged } from '../redux/slices/dashboard/index';
import { useEffect, useState } from "react";

export interface HeadersTable {
  title: string;
  refCol: keyof DataDepartment;
}

const headers: HeadersTable[] = [
    {title: 'Id', refCol: 'id'}, 
    {title: 'Name', refCol: 'name'}, 
    {title: 'Surface', refCol: 'surface'}, 
    {title: 'Population', refCol: 'population'}, 
    {title: 'Phone Prefix', refCol: 'phonePrefix'}, 
]

export const useDepartments = () => {
    const [dataDepartments, setDataDepartments] = useState<DataDepartment[]>([])

    const dispatch = useCustomDispatch();
  
    const {
      dashboard: { isLoading, departments, pagedDepartments }
    } = useCustomSelector((state) => state);

    const getDepartments = (page: number, numberPage: number): void => {
      dispatch(getDepartmentsDataPaged(page, numberPage));
    };

    useEffect(() => {
      getDepartments(1, 10)
    }, [])

    useEffect(() => {
      if(!departments) return
      const formatData: DataDepartment[] = departments.map(el =>(
        {
            id: el.id,
            name: el.name,
            phonePrefix: el.phonePrefix,
            population: el.population,
            surface: el.surface,
        }
      ))
      setDataDepartments(formatData)
    }, [departments])


    return { isLoading, dataDepartments, headers, pagedDepartments, getDepartments }

}
