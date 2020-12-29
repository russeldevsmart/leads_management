import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ApexCharts from "apexcharts";
import { useIntl } from "react-intl";

export default function LeadsSourceChart() {
  const intl = useIntl();
  const { leadSourceChartData } = useSelector(
    (state) => ({
      leadSourceChartData: state.dashboard.leadSourceChartData,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!leadSourceChartData) return;
    const source_chart_element = document.getElementById("leads_source_chart");
    
    if (!source_chart_element) {
      return;
    }
    const chart = new ApexCharts(source_chart_element, getChartOption(leadSourceChartData, intl));
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };

  }, [leadSourceChartData, intl]);

  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-header">
          <div className="card-title">
              <h3 className="card-label">{intl.formatMessage({ id: "DASHBOARD.LEAD_SOURCE" })}</h3>
          </div>
        </div>
        <div className="card-body">
          <div id="leads_source_chart" className="d-flex justify-content-center"></div>
        </div>
      </div>
    </>
  );
};

function getChartOption(leadSourceChartData, intl) {
  let chartData = [], label = [];
  leadSourceChartData.forEach(element => {
    chartData.push(element.count);
    if (element.label === "Unknown")
      label.push(intl.formatMessage({id: "UNKNOWN"}));
    else
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
      width: 400,
      height: 300,
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
      locales: [{
        name: "en",
        options: {
          toolbar: {
            "exportToSVG": "Download SVG",
            "exportToPNG": "Download PNG",
            "exportToCSV": "Download CSV",
          }
        }
      }, {
        name: "fr",
        options: {
          toolbar: {
            "exportToSVG": "Télécharger SVG",
            "exportToPNG": "Télécharger PNG",
            "exportToCSV": "Télécharger CSV",
          }
        }
      }],
      defaultLocale: intl.locale
    },
    labels: label,
    responsive: [{
      breakpoint: 680,
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