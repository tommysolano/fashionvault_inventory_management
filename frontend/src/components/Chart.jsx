import { useEffect, useRef } from "react";
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const Chart = ({ salesData }) => {
  const chartRef = useRef(null); // Reference to the canvas element
  const chartInstance = useRef(null); // Reference to the Chart.js instance

  useEffect(() => {
    if (!salesData || !chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    // Destroy the existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: Object.keys(salesData), // Extract month labels
        datasets: [
          {
            label: "Monthly Sales",
            data: Object.values(salesData), // Extract sales values
            borderColor: "#FCA311",
            backgroundColor: "#FCA311",
            fill: false,
            tension: 0.1, // Smooth lines
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Sales per Month",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Months",
            },
          },
          y: {
            title: {
              display: true,
              text: "Total Sales ($)",
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [salesData]);

  return <canvas ref={chartRef} />;
};

export default Chart;
