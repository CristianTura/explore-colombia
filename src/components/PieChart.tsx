import React  from 'react'
import ReactEcharts from "echarts-for-react"
import { DataGraphDepartments } from 'hooks/useHome';

interface PieChartProps {
    data: DataGraphDepartments;
}
  
const PieChart: React.FC<PieChartProps> = ({data}) => {

    const options = {
        title: {
            show: false,
        },
        tooltip: {
            formatter: function (val:any) {
                return `${val.name} : ${(val.value)}`
            },
        },
        legend: {
            type: 'scroll',
            orient: 'horizontal',
            left: 'center',
            top: 'auto',
            bottom: 5,
            data: data.legendData,
        },
        color: [
            "#3c4ccf", 
            "#02a499", 
            "#38a4f8", 
            "#2e6183",
            "#4C517A", 
            "#02a499", 
            "#38a4f8", 
            "#2e6183",
          ],
        series: [
            {   
                type: 'pie',
                radius: '70%',
                center: ['50%', '40%'],
                data: data.seriesData,
                label: {
                    show: false,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    

  return (
    <ReactEcharts style={{ height: "300px" }} option={options} />
  )
}

export default PieChart
