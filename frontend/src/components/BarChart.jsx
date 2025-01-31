import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, onBarClick }) => {
  const features = ['A', 'B', 'C', 'D', 'E', 'F'];

  const getFeatureData = (feature) => data.map((item) => parseInt(item[feature]));
  const calculateTotal = (feature) => getFeatureData(feature).reduce((a, b) => a + b, 0);

  const chartData = {
    labels: features,
    datasets: [
      {
        label: 'Feature Data',
        data: features.map(calculateTotal),
        backgroundColor: Array(features.length).fill('rgba(134, 239, 172, 0.7)'),
        hoverBackgroundColor: Array(features.length).fill('rgba(134, 239, 172, 1)'),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { 
          stepSize: 500, 
          max: Math.max(...features.map(calculateTotal)) + 500,
        },
      },
      y: {
        beginAtZero: true,
        labels: features,
      },
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        onBarClick(features[elements[0].index]);
      }
    },
  };

  return <div className="h-[310px] w-full"><Bar data={chartData} options={options} /></div>;
};

export default BarChart;
