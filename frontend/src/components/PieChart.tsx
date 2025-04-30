// PieChart.tsx
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip);

type PieChartProp = {
    income: number;
    spending: number;
    categories: SpendingCategory[]
}

const PieChart = ({ income, spending, categories }: PieChartProp) => {
    const data = {
      labels: [...categories.map((cat) => cat.name), "Savings"],
      datasets: [
        {
          data: [...categories.map((cat) => cat.total), income - spending],
          backgroundColor: [
            "#fdf1d1",
            "#cd9b59",
            "#f8e4c4",
            "#f3d9b0",
            "#ffe9c0",
            "#f7ead9",
            "#f5deb3",
            "#d2a679"
          ],
          borderRadius: 5,
          borderWidth: 10,
          borderColor: "#56694f"
        },
      ],
    };
  
    return (
      <div style={{ width: '300px', margin: '0 auto' }}>
        <Doughnut data={data} />
      </div>
    );
  };
  
  export default PieChart;