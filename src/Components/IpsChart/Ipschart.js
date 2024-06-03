import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Ipschart.styles.css';



const getTopSourceIPs = (data, limit = 5) => {
  const ipCounts = data.reduce((acc, { src_ip }) => {
    acc[src_ip] = (acc[src_ip] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(ipCounts)
    .map(([ip, count]) => ({ ip, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

const IPsChart = ({ data = [] }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null); 

  useEffect(() => {
    const chartData = getTopSourceIPs(data);
    const labels = chartData.map(({ ip }) => ip);
    const counts = chartData.map(({ count }) => count);
  
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
            label: 'Count',
            data: counts,
            backgroundColor: '#ff7300'
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
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
    <div>
    <h2>Top Source IPs</h2>
    <canvas ref={chartContainer}></canvas>
    </div>
  );
};



export default IPsChart;

