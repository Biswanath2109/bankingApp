"use client"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DougnutChart = ({accounts}:DoughnutChartProps) => {
    const data = {
        datasets: [{
            labels: "Banks",
            data: [1250.89, 3000, 2300],
            backgroundColor: ['#0747b6', '#2265d8' ,'#2f91fa']
        }],
        labels: ['Bank 1', 'Bank 2', 'Bank 3']
    }
  return (
      <Doughnut data={data} options={
        {cutout: '60%',
         plugins: {
          legend: {
            display: false
          }  
         }   
        }
      } />
    
  )
}

export default DougnutChart
