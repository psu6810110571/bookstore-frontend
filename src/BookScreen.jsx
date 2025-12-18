import { useState, useEffect, useMemo } from 'react';
import { Layout, Divider, Button, message, Input, Select, Row, Col, Card } from 'antd'; 
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'; 
import axios from 'axios';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Dashboard from './components/Dashboard'; 

const URL_BOOK = "/api/book";
const URL_CATEGORY = "/api/book-category";

const { Header, Content } = Layout;

export default function BookScreen(props) { 
    const [bookData, setBookData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editItem, setEditItem] = useState(null); 
    
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // ✅ ฟังก์ชันช่วยในการตั้งค่า Header สำหรับส่ง Token
    const getAuthHeader = () => {
        const token = localStorage.getItem('token'); // แก้ไขชื่อ key ให้ตรงกับที่ระบบคุณใช้เก็บ Token
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const fetchBooks = async () => {
        try {
            // ✅ ส่ง getAuthHeader() ไปพร้อมกับคำขอ
            const response = await axios.get(URL_BOOK, getAuthHeader());
            setBookData(response.data);
        } catch (err) { 
            console.error("Fetch Books Error:", err);
            if (err.response?.status === 401) {
                message.error("กรุณาเข้าสู่ระบบใหม่อีกครั้ง (Session Expired)");
            }
        }
    };

    const fetchCategories = async () => {
        try {
            // ✅ ส่ง getAuthHeader() ไปพร้อมกับคำขอ
            const response = await axios.get(URL_CATEGORY, getAuthHeader());
            setCategories(response.data.map(cat => ({
                label: cat.name,
                value: cat.id
            })));
        } catch (err) { 
            console.error("Fetch Categories Error:", err);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchCategories();
    }, []);

    const filteredBooks = useMemo(() => {
        return bookData.filter(book => {
            const text = searchText.toLowerCase();
            const matchesText = 
                book.title.toLowerCase().includes(text) ||
                book.author.toLowerCase().includes(text) ||
                (book.isbn && book.isbn.includes(text));

            const matchesCategory = selectedCategory 
                ? book.category && book.category.id === selectedCategory 
                : true;

            return matchesText && matchesCategory;
        });
    }, [bookData, searchText, selectedCategory]);

    const handleAddBook = async (book) => {
        try {
            // ✅ เพิ่ม getAuthHeader()
            await axios.post(URL_BOOK, book, getAuthHeader());
            message.success("เพิ่มหนังสือสำเร็จ! 📚");
            fetchBooks();
        } catch (err) { 
            console.log(err); 
            message.error("เพิ่มหนังสือไม่สำเร็จ: ไม่มีสิทธิ์เข้าถึง");
        }
    };

    const handleDeleted = async (id) => {
        try {
            // ✅ เพิ่ม getAuthHeader()
            await axios.delete(`${URL_BOOK}/${id}`, getAuthHeader());
            message.success("ลบหนังสือเรียบร้อย 🗑️");
            fetchBooks();
        } catch (err) { console.log(err); }
    };

    const handleLikeBook = async (book) => {
        try {
            // ✅ เพิ่ม getAuthHeader()
            await axios.post(`${URL_BOOK}/${book.id}/like`, {}, getAuthHeader());
            fetchBooks(); 
        } catch (err) {
            console.log("Like Failed:", err);
            message.error("กด Like ไม่สำเร็จ");
        }
    };

    const handleEdit = (record) => {
        setEditItem(record);
    };

    const handleUpdateBook = async (values) => {
        try {
            const { id, category, createdAt, updatedAt, ...updateData } = values;
            if (updateData.price) updateData.price = parseFloat(updateData.price);
            if (updateData.stock) updateData.stock = parseInt(updateData.stock);

            // ✅ เพิ่ม getAuthHeader()
            await axios.patch(`${URL_BOOK}/${editItem.id}`, updateData, getAuthHeader());
            
            setEditItem(null); 
            fetchBooks();
            message.success("แก้ไขข้อมูลสำเร็จ! 🎉");

        } catch (err) { 
            console.log("❌ Update Failed:", err);
            const serverError = err.response?.data?.message || err.message;
            message.error(`บันทึกไม่สำเร็จ: ${JSON.stringify(serverError)}`);
        }
    };

    const totalAmount = filteredBooks.reduce((sum, book) => sum + (book.price * book.stock), 0);

    return (
        <Layout> 
            <Header style={{ 
                backgroundColor: '#fff', 
                padding: '0 50px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid #f0f0f0', 
                height: '64px'
            }}>
                <h1 style={{ margin: 0, fontSize: '24px', color: '#593309', fontWeight: 600 }}>
                    📚 BookNook Inventory
                </h1>
                {props.onLogout && <Button danger onClick={props.onLogout}>Logout</Button>}
            </Header>

            <Content style={{ padding: '0 50px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
                <div style={{ margin: '0 auto', paddingTop: '20px', maxWidth: '1280px' }}>
                    
                    <Dashboard data={bookData} />
   
                    <div style={{ 
                        padding: '24px', 
                        marginBottom: '20px', 
                        backgroundColor: '#fff', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h2 style={{ margin: 0 }}>Manage Books</h2>
                            <AddBook onBookAdded={handleAddBook} categories={categories} />
                        </div>

                        <Card variant="none" style={{ backgroundColor: '#fafafa', marginBottom: 20 }}>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input
                                        placeholder="Search by Title, Author, or ISBN..."
                                        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        allowClear
                                        size="large"
                                    />
                                </Col>
                                <Col span={8}>
                                    <Select
                                        placeholder={<span><FilterOutlined /> Filter by Category</span>}
                                        style={{ width: '100%' }}
                                        allowClear
                                        onChange={(value) => setSelectedCategory(value)}
                                        options={categories}
                                        size="large"
                                    />
                                </Col>
                            </Row>
                        </Card>

                        <Divider titlePlacement="left" style={{ borderColor: '#ccc', fontWeight: 'bold', color: '#555' }}>
                            📦 Book List ({filteredBooks.length} items) - Value: ${totalAmount.toLocaleString()}
                        </Divider>
    
                        <div style={{ paddingBottom: '30px' }}>
                            <BookList
                                data={filteredBooks}
                                onDeleted={handleDeleted}
                                onEdit={handleEdit}
                                onLiked={handleLikeBook}
                            />
                        </div>
                    </div>
                </div>
            </Content>

            <EditBook 
                isOpen={!!editItem} 
                item={editItem}
                categories={categories}
                onSave={handleUpdateBook}
                onCancel={() => setEditItem(null)}
            />
        </Layout>
    );
}