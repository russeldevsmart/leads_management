import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ApexCharts from "apexcharts";
import { useIntl } from "react-intl";

export default function WeeklyLeadsChart() {
  const intl = useIntl();

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
      const labels = [intl.formatMessage({id: "CHART.LAST_7_DAYS"}), intl.formatMessage({id: "CHART.LAST_7_DAYS_BEFORE_7_DAYS"})];
      const chart = new ApexCharts(weekly_leads_element, getChartOption(weeklyLeadsChartData, labels));
      chart.render();
      return function cleanUp() {
        chart.destroy();
      };
    }

  }, [weeklyLeadsChartData, intl]);

  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-header">
            <div className="card-title">
            <h3 className="card-label">{intl.formatMessage({ id: "DASHBOARD.WEEKLY_LEADS" })}</h3>
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

function getChartOption(weeklyLeadsChartData, labels) {
  // Shared Colors Definition
  const primary = '#6993FF';
  const success = '#1BC5BD';

  const options = {
    series: [{
      name: labels[0],
      data: weeklyLeadsChartData.data
    }, {
      name: labels[1],
      data: weeklyLeadsChartData.data1
    }],
    chart: {
      height: 350,
      type: 'area',
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
    yaxis: {
      type: 'string',
      labels: {
        formatter: function (val) {
          return val.toFixed(0)
        }
      }
    },
    colors: [primary, success]
  };
  return options;
}