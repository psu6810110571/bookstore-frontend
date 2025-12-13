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

// ลงทะเบียนอุปกรณ์วาดกราฟ
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard(props) {
    
    // ตั้งค่าหน้าตากราฟ
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Stock Availability' },
        },
    };

    // เตรียมข้อมูล: แกน X เป็นชื่อหนังสือ, แกน Y เป็นจำนวนสต็อก
    // ต้องเช็คก่อนว่ามี props.data ส่งมาไหม เพื่อกัน Error
    const labels = props.data ? props.data.map(book => book.title) : [];
    const stockData = props.data ? props.data.map(book => book.stock) : [];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Stock Amount',
                data: stockData,
                backgroundColor: 'rgba(53, 162, 235, 0.6)', // สีฟ้า
            },
        ],
    };

    return (
        <Card title="Dashboard Statistics" style={{ margin: '20px 0' }}>
            <Bar options={options} data={data} />
        </Card>
    );
}