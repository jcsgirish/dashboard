
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './AlertbarChart.Styles.css';

const AlertbarChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const labels = Object.keys(data);
    const counts = Object.values(data);

    if (chartContainer.current) {
    
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Alert Categories',
            data: counts,
            backgroundColor: '#82ca9d'
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Categories'
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
            legend: {
              display: true,
              position: 'top',
            }
          },
        }
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className='barcontainer'>
      <h2>Alert Categories</h2>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default AlertbarChart;

