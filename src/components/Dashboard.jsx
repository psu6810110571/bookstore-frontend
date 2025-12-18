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

    // ✅ แก้แล้ว: กรองเฉพาะหนังสือที่มี Stock > 0 เพื่อให้กราฟแสดงผลได้
    const booksWithStock = props.data ? props.data.filter(book => book.stock > 0) : [];
    const labels = booksWithStock.map(book => book.title);
    const stockData = booksWithStock.map(book => book.stock);

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
            {booksWithStock.length > 0 ? (
                <Bar options={options} data={data} />
            ) : (
                <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                    📊 No books with stock available to display
                </p>
            )}
        </Card>
    );
}