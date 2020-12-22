import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ApexCharts from "apexcharts";

export default function WeeklyLeadsChart() {

  const { weeklyLeadsChartData } = useSelector(
    (state) => ({
      weeklyLeadsChartData: state.dashboard.weeklyLeadsChartData,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (weeklyLeadsChartData) {
      const weekly_leads_element = document.getElementById("weekly_leads_chart");
    
      if (!weekly_leads_element) {
        return;
      }
      
      const chart = new ApexCharts(weekly_leads_element, getChartOption(weeklyLeadsChartData));
      chart.render();
      return function cleanUp() {
        chart.destroy();
      };
    }

  }, [weeklyLeadsChartData]);

  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-header">
            <div className="card-title">
            <h3 className="card-label">Weekly Leads</h3>
            </div>
        </div>
        <div className="card-body">
            <div className="" id="weekly_leads_chart">

            </div>
        </div>
      </div>
    </>
  );
};

function getChartOption(weeklyLeadsChartData) {
  // Shared Colors Definition
  const primary = '#6993FF';
  const success = '#1BC5BD';

  const options = {
    series: [{
      name: 'Last 7 days',
      data: weeklyLeadsChartData.data
    }, {
      name: 'Last 7 days before 7 days',
      data: weeklyLeadsChartData.data1
    }],
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'string',
      categories: weeklyLeadsChartData.label
    },
    colors: [primary, success]
  };
  return options;
}