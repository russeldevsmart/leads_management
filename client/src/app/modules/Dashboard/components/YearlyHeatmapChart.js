import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ApexCharts from "apexcharts";

export default function YearlyHeatmapChart() {

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
    
    const chart = new ApexCharts(yearly_heatmap_elem, getChartOption(yearlyHeatmapData));
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };

  }, [yearlyHeatmapData]);

  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-header">
            <div className="card-title">
            <h3 className="card-label">Yearly Heatmap</h3>
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

function getChartOption(yearlyHeatmapData) {
  // Shared Colors Definition
  const primary = '#6993FF';
  const success = '#1BC5BD';
  const warning = '#FFA800';
  const danger = '#F64E60';

  const options = {
    series: [{
      name: 'Jan',
      data: yearlyHeatmapData['Jan']
    },
    {
      name: 'Feb',
      data: yearlyHeatmapData['Feb']
    },
    {
      name: 'Mar',
      data: yearlyHeatmapData['Mar']
    },
    {
      name: 'Apr',
      data: yearlyHeatmapData['Apr']
    },
    {
      name: 'May',
      data: yearlyHeatmapData['May']
    },
    {
      name: 'Jun',
      data: yearlyHeatmapData['Jun']
    },
    {
      name: 'Jul',
      data: yearlyHeatmapData['Jul']
    },
    {
      name: 'Aug',
      data: yearlyHeatmapData['Aug']
    },
    {
      name: 'Sep',
      data: yearlyHeatmapData['Sep']
    },
    {
      name: 'Oct',
      data: yearlyHeatmapData['Oct']
    },
    {
      name: 'Nov',
      data: yearlyHeatmapData['Nov']
    },
    {
      name: 'Dec',
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
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,

        colorScale: {
          ranges: [{
            from: -1,
            to: 0,
            name: 'low',
            color: success
          },
          {
            from: 1,
            to: 5,
            name: 'medium',
            color: primary
          },
          {
            from: 6,
            to: 10,
            name: 'high',
            color: warning
          },
          {
            from: 11,
            to: 15,
            name: 'extreme',
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
