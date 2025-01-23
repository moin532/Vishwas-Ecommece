import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({products}) => {


    let outOfStock = 0;
  
    products &&
      products.forEach((item) => {
    
        if (item.Stock === 0) {
          outOfStock += 1;
        }
      });

  const data = {
    labels: ["Out of Stock", "In-Stock"],
    datasets: [
      {
        label: 'Out of Stock',
        data: [outOfStock, products.length - outOfStock],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Chart ',
      },
    },
  };

  return (
    <div className="   h-96  ml-20 w-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
