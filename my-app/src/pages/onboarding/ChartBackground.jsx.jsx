import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

// Constants
const DATA_LENGTH = 1000; // Number of points on screen
const UPDATE_INTERVAL = 20; // milliseconds (smooth)
const INITIAL_PRICE = 10;

// Generate some fluctuating initial data
const generateInitialData = () => {
  const data = [INITIAL_PRICE];
  for (let i = 1; i < DATA_LENGTH; i++) {
    const last = data[i - 1];
    const change = (Math.random() - 0.5) * 5;
    const next = Math.max(0, last + change);
    data.push(next);
  }
  return data;
};

const ChartBackground = () => {
  const [chartData, setChartData] = useState(generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => {
        const lastPrice = prevData[prevData.length - 1];
        const change = (Math.random() - 0.5) * 5;
        const newPrice = Math.max(0, lastPrice + change);
        const newData = [...prevData.slice(1), newPrice];
        return newData;
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: chartData.map((_, i) => i),
    datasets: [
      {
        label: 'Stock Value',
        data: chartData,
        borderColor: 'rgba(255, 60, 60, 1)',
        backgroundColor: 'rgba(255, 60, 60, 0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: true,
      ticks: {
        color: 'rgba(255, 255, 255, 0.5)',
        maxTicksLimit: 10,
      },
      grid: {
        // Only show the bottom line of the x axis grid, hide the rest
        drawOnChartArea: false,  // no vertical grid lines inside chart
        drawTicks: true,
        drawBorder: true, // the bottom border line of x axis
        borderColor: 'rgba(255, 255, 255, 0.5)', // color of bottom line
      },
    },
    y: {
      display: false, // hide y axis completely
      grid: {
        drawTicks: false,
        drawBorder: false,
        display: false,
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0,0,0,0.9)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: 'rgba(255, 60, 60, 1)',
      borderWidth: 1,
      position: 'nearest',
      callbacks: {
        label: (tooltipItem) => `Value: ${tooltipItem.raw.toFixed(2)}`,
      },
    },
  },
  animation: {
    duration: UPDATE_INTERVAL * 0.8,
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
};



  return (
   <div
  style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100vw',
    height: '60vh',  
    zIndex: 0,
    opacity: 1,
    // pointer events allowed for tooltip by default
  }}
>
  <Line data={data} options={options} />
</div>

  );
};

export default ChartBackground;
