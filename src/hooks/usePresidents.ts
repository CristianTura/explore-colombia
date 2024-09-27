import { useCustomDispatch, useCustomSelector } from "./redux";
import { useEffect, useState } from "react";
import { getPresidentsPaged } from "../redux/slices/pages";
import { DataPresidents, HeadersTablePresident } from "interfaces";


const headers: HeadersTablePresident[] = [
    {title: 'Id', refCol: 'id'}, 
    {title: 'Name', refCol: 'name'}, 
    {title: 'Last Name', refCol: 'lastName'}, 
    {title: 'Start Period Date', refCol: 'startPeriodDate'}, 
    {title: 'End Period Date', refCol: 'endPeriodDate'}, 
    {title: 'Political Party', refCol: 'politicalParty'}, 
]

export const usePresidents = () => {
    const [dataPresidentsCustom, setDataPresidentsCustom] = useState<DataPresidents[]>([])

    const dispatch = useCustomDispatch();
  
    const {
      pages: { isLoading, dataPresidents, pagedPresidents }
    } = useCustomSelector((state) => state);

    const getPresidents = (page: number, numberPage: number): void => {
      dispatch(getPresidentsPaged(page, numberPage));
    };

    useEffect(() => {
      getPresidents(1, 10)
    }, [])

    useEffect(() => {
      if(!dataPresidents) return
      const formatData: DataPresidents[] = dataPresidents.map(el =>(
        {
            id: el.id,
            name: el.name,
            lastName: el.lastName,
            startPeriodDate: el.startPeriodDate,
            endPeriodDate: el.endPeriodDate,
            politicalParty: el.politicalParty,
        }
      ))
      setDataPresidentsCustom(formatData)
    }, [dataPresidents])


    return { isLoading, dataPresidentsCustom, headers, pagedPresidents, getPresidents }

}
