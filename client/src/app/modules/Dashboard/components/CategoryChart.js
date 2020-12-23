import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ApexCharts from "apexcharts";

export default function CategoryChart() {
  const { leadsCategoryChartData } = useSelector(
    (state) => ({
      leadsCategoryChartData: state.dashboard.leadsCategoryChartData,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!leadsCategoryChartData) return;
    const category_chart_element = document.getElementById("leads_category_chart");
    
    if (!category_chart_element) {
      return;
    }
    
    const chart = new ApexCharts(category_chart_element, getChartOption(leadsCategoryChartData));
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };

  }, [leadsCategoryChartData]);

  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-header">
          <div className="card-title">
              <h3 className="card-label">Leads Categories</h3>
          </div>
        </div>
        <div className="card-body">
          <div id="leads_category_chart" className="d-flex justify-content-center"></div>
        </div>
      </div>
    </>
  );
};

function getChartOption(leadsCategoryChartData) {
  // Shared Colors Definition
  const primary = '#6993FF';
  const success = '#1BC5BD';
  const info = '#8950FC';
  const infoLight = '#EEE5FF';
  const warning = '#FFA800';
  const danger = '#F64E60';
  const gray = '#3F4254';
  const green = '#1bf789';

  const options = {
    series: leadsCategoryChartData,
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
    },
    plotOptions: {
        bar: {
            horizontal: true,
        },
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    xaxis: {
      categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    },
    yaxis: {
      title: {
          text: undefined
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(0)
        }
      }
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
    },
    colors: [primary, success, warning, danger, info, infoLight, gray, green]
  };
  
  return options;
}