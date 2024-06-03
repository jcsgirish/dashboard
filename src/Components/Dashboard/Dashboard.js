// src/components/Dashboard.js
import React from 'react';
import AlertTimeChart from '../AlertTimeChart/AlertTimeChart';
import AlertbarChart from '../AlertbarChart/AlertbarChart';
import AlertpieChart from '../AlertPieChart/AlertpieChart';
import Ipschart from '../IpsChart/Ipschart';
import { aggregatedData, categoryData, severityData, rawData } from '../Data';
import './Dashboard.styles.css'


const Dashboard = () => {
  return (
    <div className='Dashboardcontainer' >
      <h1>Security Alerts Dashboard</h1>
      <AlertTimeChart data={aggregatedData} />
      <AlertbarChart data={categoryData} />
      <AlertpieChart data={severityData} />
      <Ipschart data={rawData} />
    </div>
  );
};

export default Dashboard;
