import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register components and plugins
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, zoomPlugin);

const LineChart = ({ data, feature }) => {
  // Extract the data for the selected feature (A, B, C, D, E, F)
  const chartData = {
    labels: data.map((item) => item.Day),  // Days on x-axis
    datasets: [
      {
        label: `${feature} Trend`,
        data: data.map((item) => parseInt(item[feature])),  // Feature data for the trend
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      zoom: {
        pan: { enabled: true, mode: 'x' },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          drag: { enabled: true },
          mode: 'x',
        },
      },
    },
  };

  return (
    <div className="h-[310px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
