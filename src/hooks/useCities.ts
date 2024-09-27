import { useCustomDispatch, useCustomSelector } from "./redux";
import { useEffect, useState } from "react";
import { getCitiesDataPaged } from "../redux/slices/pages";
import { DataCities, HeadersTableCities } from "interfaces";



const headers: HeadersTableCities[] = [
    {title: 'Id', refCol: 'id'}, 
    {title: 'Name', refCol: 'name'}, 
    {title: 'Surface', refCol: 'surface'}, 
    {title: 'Population', refCol: 'population'}, 
    {title: 'Postal Code', refCol: 'postalCode'}, 
]

export const useCities = () => {
    const [dataCitiesTable, setDataCitiesTable] = useState<DataCities[]>([])

    const dispatch = useCustomDispatch();
  
    const {
      pages: { isLoading, dataCities, pagedCities }
    } = useCustomSelector((state) => state);

    const getCities = (page: number, numberPage: number): void => {
      dispatch(getCitiesDataPaged(page, numberPage));
    };

    useEffect(() => {
      getCities(1, 10)
    }, [])

    useEffect(() => {
      if(!dataCities) return
      const formatData: DataCities[] = dataCities.map(el =>(
        {
            id: el.id,
            name: el.name,
            surface: el.surface,
            population: el.population,
            postalCode: el.postalCode,
        }
      ))
      setDataCitiesTable(formatData)
    }, [dataCities])


    return { isLoading, dataCitiesTable, headers, pagedCities, getCities }

}
