import styled from "styled-components";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Container = styled.div`
  min-width: 100%;
`;
const data = [
  { month: "Janvier", count: 10000 },
  { month: "Fevrier", count: 12000 },
  { month: "Mars", count: 15000 },
  { month: "Avril", count: 18000 },
  { month: "Mai", count: 20000 },
  { month: "Juin", count: 22000 },
  { month: "Juillet", count: 10000 },
  { month: "Aout", count: 27000 },
  { month: "Septembre", count: 30000 },
  { month: "Octobre", count: 32000 },
  { month: "Novembre", count: 35000 },
  { month: "Decembre", count: 15000 },
];
function GraphYear() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((row) => row.month),
        datasets: [
          {
            label: "Chiffre d'affaires par mois",
            data: data.map((row) => row.count),
            backgroundColor: "green",
            borderColor: "green",
            borderWidth: 1,
            borderRadius: 10,
          },
        ],
      },

      options: {
        indexAxis: "y",

        responsive: true,
        aspectRatio: 1,

        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <Container>
      <canvas id="myChart"></canvas>
    </Container>
  );
}

export default GraphYear;
