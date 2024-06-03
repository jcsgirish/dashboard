
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './AlertpieChart.Styles.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AlertpieChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const labels = data.map(entry => entry.severity);
    const counts = data.map(entry => entry.count);

    if (chartContainer.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: counts,
            backgroundColor: COLORS
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 15,
              }
            }
          },
          elements: {
            arc: {
              borderWidth: 0
            }
          },
          radius: '40%',
          cutout: '50%' 
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
    <div className='piecontainer'>
      <h2>Alert Severity Distribution</h2>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default AlertpieChart;
