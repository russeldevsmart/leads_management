import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ApexCharts from "apexcharts";

export default function LeadsTypeChart() {
  const { leadTypeChartData } = useSelector(
    (state) => ({
      leadTypeChartData: state.dashboard.leadTypeChartData,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!leadTypeChartData) return;
    const type_chart_element = document.getElementById("leads_type_chart");
    
    if (!type_chart_element) {
      return;
    }
    
    const chart = new ApexCharts(type_chart_element, getChartOption(leadTypeChartData));
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };

  }, [leadTypeChartData]);

  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-header">
          <div className="card-title">
              <h3 className="card-label">Lead Type</h3>
          </div>
        </div>
        <div className="card-body">
          <div id="leads_type_chart" className="d-flex justify-content-center"></div>
        </div>
      </div>
    </>
  );
};

function getChartOption(leadTypeChartData) {
  let chartData = [], label = [];
  leadTypeChartData.forEach(element => {
    chartData.push(element.count);
    label.push(element.label);
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
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
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