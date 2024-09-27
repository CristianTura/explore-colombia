import { useCustomDispatch, useCustomSelector } from "./redux";
import { useEffect, useState } from "react";
import { getTouristicAttractionPaged } from "../redux/slices/pages";
import { DataTouristicAttraction } from "interfaces";


export const useTouristicAttraction = () => {
    const [dataTouristicAttraction, setTouristicAttraction] = useState<DataTouristicAttraction[]>([])

    const dispatch = useCustomDispatch();
  
    const {
      pages: { isLoading, touristicAttraction, pagedTouristicAttraction }
    } = useCustomSelector((state) => state);

    const getTouristicAttraction = (page: number, numberPage: number): void => {
      dispatch(getTouristicAttractionPaged(page, numberPage));
    };

    useEffect(() => {
      getTouristicAttraction(1, 10)
    }, [])

    useEffect(() => {
      if(!touristicAttraction) return
      const formatData: DataTouristicAttraction[] = touristicAttraction.map(el =>(
        {
            id: el.id,
            name: el.name,
            images: el.images,
            description : el.description
        }
      ))
      setTouristicAttraction(formatData)
    }, [touristicAttraction])


    return { isLoading, dataTouristicAttraction, pagedTouristicAttraction, getTouristicAttraction }

}
