import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  
  function LineChart({orders}) {

    const data = {
      labels: [20, 30, 40, 50, 60, 70, 80, 90, 100],
      datasets: [
        {
          label: 'Total Revenue',
          data: [20, 30, 40, 50, 60, 70, 80, 90, 100,],
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        },
        {
          label: 'Total Sales',
          data: [0,orders && orders.length],
          fill: false,
          backgroundColor: 'rgba(153,102,255,0.2)',
          borderColor: 'rgba(153,102,255,1)',
        },
      ],
    };
    
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    
    return <Line data={data} options={options} />;
  }
  
  export default LineChart;
  