import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Stock Availability' },
        },
    };

    const labels = props.data ? props.data.map(book => book.title) : [];
    const stockData = props.data ? props.data.map(book => book.stock) : [];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Stock Amount',
                data: stockData,
                backgroundColor: 'rgba(53, 162, 235, 0.6)', 
            },
        ],
    };

    return (
        /* ✅ แก้ไข: เพิ่ม variant="outlined" เพื่อลบ Warning */
        <Card title="Dashboard Statistics" variant="outlined" style={{ margin: '20px 0' }}>
            <Bar options={options} data={data} />
        </Card>
    );
}