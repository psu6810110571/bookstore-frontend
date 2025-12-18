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
import { Card, Row, Col, Statistic, Spin, Divider } from 'antd';
import { BookOutlined, DollarOutlined, WarningOutlined, HeartOutlined } from '@ant-design/icons';

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
            title: { display: true, text: 'Stock Availability by Title' },
        },
    };

    if (!props.data) {
        return (
            <Card title="📊 Dashboard Statistics" style={{ margin: '20px 0' }}>
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Spin size="large" />
                </div>
            </Card>
        );
    }

    const booksWithStock = props.data.filter(book => book.stock > 0);
    const totalBooks = props.data.length;
    const totalValue = props.data.reduce((sum, book) => sum + (book.price * book.stock), 0);
    const outOfStock = props.data.filter(book => book.stock === 0).length;
    const mostLiked = props.data.length > 0 
        ? Math.max(...props.data.map(b => b.likeCount || 0)) 
        : 0;

    const labels = booksWithStock.map(book => book.title);
    const stockData = booksWithStock.map(book => book.stock);

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
        <Card 
            title="📊 Dashboard Statistics" 
            style={{ 
                margin: '20px 0',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
        >
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic 
                            title="Total Books" 
                            value={totalBooks} 
                            prefix={<BookOutlined />}
                            styles={{ value: { color: '#3f8600' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic 
                            title="Total Value" 
                            value={totalValue.toFixed(2)} 
                            prefix={<DollarOutlined />}
                            styles={{ value: { color: '#1890ff' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic 
                            title="Out of Stock" 
                            value={outOfStock} 
                            prefix={<WarningOutlined />}
                            styles={{ value: { color: outOfStock > 0 ? '#cf1322' : '#3f8600' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic 
                            title="Most Liked Book" 
                            value={mostLiked} 
                            prefix={<HeartOutlined />}
                            suffix="likes"
                            styles={{ value: { color: '#722ed1' } }}
                        />
                    </Card>
                </Col>
            </Row>

            <Divider />

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