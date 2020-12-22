import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ApexCharts from "apexcharts";

export default function LeadsStatusChart() {
  const { leadStatuChartData } = useSelector(
    (state) => ({
      leadStatuChartData: state.dashboard.leadStatuChartData,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!leadStatuChartData) return;
    const status_chart_element = document.getElementById("leads_status_chart");
    
    if (!status_chart_element) {
      return;
    }
    
    const chart = new ApexCharts(status_chart_element, getChartOption(leadStatuChartData));
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };

  }, [leadStatuChartData]);

  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-header">
          <div className="card-title">
              <h3 className="card-label">Lead Status</h3>
          </div>
        </div>
        <div className="card-body">
          <div id="leads_status_chart" className="d-flex justify-content-center"></div>
        </div>
      </div>
    </>
  );
};

function getChartOption(leadStatuChartData) {
  let chartData = [], label = [];
  leadStatuChartData.forEach(element => {
    chartData.push(element.count);
    label.push(element._id);
  });
  
  // Shared Colors Definition
  const primary = '#6993FF';
  const success = '#1BC5BD';
  const info = '#8950FC';
  const warning = '#FFA800';
  const danger = '#F64E60';

  const options = {
    series: chartData,
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: label,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    colors: [primary, success, warning, danger, info]
  };
  
  return options;
}