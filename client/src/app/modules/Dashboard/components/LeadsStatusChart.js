import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ApexCharts from "apexcharts";
import { useIntl } from "react-intl";

export default function LeadsStatusChart() {
  const intl = useIntl();
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
    
    const chart = new ApexCharts(status_chart_element, getChartOption(leadStatuChartData, intl));
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };

  }, [leadStatuChartData, intl]);

  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-header">
          <div className="card-title">
              <h3 className="card-label">{intl.formatMessage({ id: "DASHBOARD.LEAD_STATUS" })}</h3>
          </div>
        </div>
        <div className="card-body">
          <div id="leads_status_chart" className="d-flex justify-content-center"></div>
        </div>
      </div>
    </>
  );
};

function getChartOption(leadStatuChartData, intl) {
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