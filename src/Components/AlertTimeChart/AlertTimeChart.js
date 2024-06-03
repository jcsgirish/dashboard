// src/components/AlertsOverTimeChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './AlertTimeChart.Styles.css';

const AlertTimeChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const labels = data.map(item => new Date(item.timestamp).toLocaleTimeString());
    const counts = data.map(item => item.count);

    if (chartContainer.current) {
      // Destroy the existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Alerts Over Time',
            data: counts,
            borderColor: '#8884d8',
            fill: false,
            tension: 0.1,
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Time'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `Count: ${context.parsed.y}`
              }
            },
            legend: {
              display: true,
              position: 'top',
            }
          },
        }
      });
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className='Container'>
      <h2>Alerts Over Time</h2>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default AlertTimeChart;

