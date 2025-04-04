"use client"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DougnutChart = ({accounts}:DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name)
  const balances = accounts.map((b) => b.currentBalance)
    const data = {
        datasets: [{
            labels: "Banks",
            data: balances,
            backgroundColor: ['#0747b6', '#2265d8' ,'#2f91fa']
        }],
        labels: accountNames
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
