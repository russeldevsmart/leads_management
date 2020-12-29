import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ApexCharts from "apexcharts";
import { useIntl } from "react-intl";

export default function YearlyHeatmapChart() {
  const intl = useIntl();

  const { yearlyHeatmapData } = useSelector(
    (state) => ({
      yearlyHeatmapData: state.dashboard.yearlyHeatmapData,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!yearlyHeatmapData) return;
    const yearly_heatmap_elem = document.getElementById("yearly_heatmap_chart");
    
    if (!yearly_heatmap_elem) {
      return;
    }
    
    const chart = new ApexCharts(yearly_heatmap_elem, getChartOption(yearlyHeatmapData, intl));
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };

  }, [yearlyHeatmapData, intl]);

  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-header">
            <div className="card-title">
            <h3 className="card-label">{intl.formatMessage({ id: "DASHBOARD.YEARLY_HEATMAP" })}</h3>
            </div>
        </div>
        <div className="card-body">
            <div className="" id="yearly_heatmap_chart">

            </div>
        </div>
      </div>
    </>
  );
};

function getChartOption(yearlyHeatmapData, intl) {
  // Shared Colors Definition
  const primary = '#6993FF';
  const success = '#1BC5BD';
  const warning = '#FFA800';
  const danger = '#F64E60';
  const info = "#8950FC";

  const options = {
    series: [{
      name: intl.formatMessage({id: "DATE.JAN"}),
      data: yearlyHeatmapData['Jan']
    },
    {
      name: intl.formatMessage({id: "DATE.FEB"}),
      data: yearlyHeatmapData['Feb']
    },
    {
      name: intl.formatMessage({id: "DATE.MAR"}),
      data: yearlyHeatmapData['Mar']
    },
    {
      name: intl.formatMessage({id: "DATE.APR"}),
      data: yearlyHeatmapData['Apr']
    },
    {
      name: intl.formatMessage({id: "DATE.MAY"}),
      data: yearlyHeatmapData['May']
    },
    {
      name: intl.formatMessage({id: "DATE.JUN"}),
      data: yearlyHeatmapData['Jun']
    },
    {
      name: intl.formatMessage({id: "DATE.JUL"}),
      data: yearlyHeatmapData['Jul']
    },
    {
      name: intl.formatMessage({id: "DATE.AUG"}),
      data: yearlyHeatmapData['Aug']
    },
    {
      name: intl.formatMessage({id: "DATE.SEP"}),
      data: yearlyHeatmapData['Sep']
    },
    {
      name: intl.formatMessage({id: "DATE.OCT"}),
      data: yearlyHeatmapData['Oct']
    },
    {
      name: intl.formatMessage({id: "DATE.NOV"}),
      data: yearlyHeatmapData['Nov']
    },
    {
      name: intl.formatMessage({id: "DATE.DEC"}),
      data: yearlyHeatmapData['Dec']
    }
    ],
    chart: {
      height: 350,
      type: 'heatmap',
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
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,

        colorScale: {
          ranges: [{
            from: -1,
            to: 0,
            name: 'nul',
            color: success
          },
          {
            from: 1,
            to: 5,
            name: 'bas',
            color: primary
          },
          {
            from: 6,
            to: 10,
            name: 'moyen',
            color: warning
          },
          {
            from: 11,
            to: 15,
            name: 'haut',
            color: info
          },
          {
            from: 11,
            to: 15,
            name: 'fort',
            color: danger
          }
          ]
        }
      }
    },
    dataLabels: {
      enabled: false
    },
  };
  return options;
}
