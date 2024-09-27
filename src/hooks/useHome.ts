import { useCustomDispatch, useCustomSelector } from "./redux";
import { getDepartmentsData, getGeneralData } from '../redux/slices/dashboard/index';
import { useEffect, useState } from "react";
import { DataCard, DataGraphDepartments, SeriesData } from "interfaces";


export const useHome = () => {
    const dispatch = useCustomDispatch();
    const [dataCards, setDataCards] = useState<DataCard[]>([])
    const [imageFlag, setImageFlag] = useState<string>("")
    const [dataGraphDepartments, setDataGraphDepartments] = useState<DataGraphDepartments>({
      seriesData: [],
      legendData: []
    })
    
    const {
      dashboard: { dataCountry, isLoading, departments }
    } = useCustomSelector((state) => state);

    const getCountryData = (): void => {
      dispatch(getGeneralData());
    };

    const getDepartments = (): void => {
      dispatch(getDepartmentsData());
    };

    useEffect(() => {
      getCountryData()
      getDepartments()
    }, [])

    useEffect(() => {
      if(!dataCountry) return
      const formartData: DataCard[] = [
        {
          Capital: dataCountry.stateCapital,
          Region: dataCountry.region,
          title: "Geographical Information",
          bgCustom: 'bg-bluelight'
        },
        {
          Population: dataCountry.population,
          Surface: dataCountry.surface,
          title: "Demographics",
          bgCustom: 'bg-redlight'
        },
        {
          Limites: dataCountry.borders.join(", "),
          "Sub Region": dataCountry.subRegion,
          title: "Geopolitical Details",
          bgCustom: 'bg-greenlight'
        },
        {
          Currency: dataCountry.currency,
          "Time Zone": dataCountry.timeZone,
          title: "Economic and Temporal Data",
          bgCustom: 'bg-yellowlight'
        },
      ]
      setDataCards(formartData)
      setImageFlag(dataCountry?.flags[0] ?? "")
    }, [dataCountry])

    useEffect(() => {
      if(!departments) return

      // let nameList = Array.from(new Set(departments.map(x => x.name)));
      let legendData: string[] = [];
      let seriesData: SeriesData[] = [];
      const top10Departaments = departments
        .filter(department => typeof department.population === 'number') 
        .sort((a, b) => +b.population - +a.population)
        .slice(0, 10);

      top10Departaments.forEach(el => {
          legendData.push(el.name);
          seriesData.push({
              name: el.name,
              value: el.population
          });
      })
      setDataGraphDepartments({
        seriesData,
        legendData,
      })
    }, [departments])


    return { getCountryData, dataCards, imageFlag, isLoading, dataGraphDepartments }

}
