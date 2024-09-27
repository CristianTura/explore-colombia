import { useCustomDispatch, useCustomSelector } from "./redux";
import { useEffect, useState, ChangeEvent } from 'react';
import { getTouristicAttractionByDepartment } from "../redux/slices/pages";
import { DataTouristicAttraction } from "interfaces";


export const useTouristicAttractionByDepartment = () => {
    const [dataTouristicByDepartment, setDataTouristicByDepartment] = useState<DataTouristicAttraction[]>([])
    const [selectedDepartment, setSelectedDepartment] = useState<string | number>("")

    const dispatch = useCustomDispatch();
  
    const {
      pages: { touristicByDepartment },
      dashboard: { isLoading, departments }
    } = useCustomSelector((state) => state);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartment(e.target.value)
        getTouristicByDepartment(e.target.value)
    }

    const getTouristicByDepartment = (idDepartment: number | string): void => {
        if(!idDepartment) return
        dispatch(getTouristicAttractionByDepartment(idDepartment));
    };

    useEffect(() => {
        if(departments && departments.length > 0){
            const idDepartment = departments[0].id ?? 15;
            setSelectedDepartment(idDepartment)
            getTouristicByDepartment(idDepartment)
        }
    }, [departments])

    useEffect(() => {
        if(touristicByDepartment) {
            const formatData: DataTouristicAttraction[] = touristicByDepartment.map(el =>(
                {
                    id: el.id,
                    name: el.name,
                    images: el.images,
                    description : el.description
                }
            ))
            setDataTouristicByDepartment(formatData)
        } else {
            setDataTouristicByDepartment([])

        }
    }, [touristicByDepartment])


    return { isLoading, dataTouristicByDepartment, departments, selectedDepartment, handleChange }

}
