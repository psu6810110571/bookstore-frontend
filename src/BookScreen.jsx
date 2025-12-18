import { useState, useEffect } from 'react';
import { Layout, Divider, Button, message, Spin } from 'antd';
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
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(URL_BOOK);
            console.log("📚 Fetched books:", response.data);
            setBookData(response.data);
        } catch (err) { 
            console.error("❌ Fetch books failed:", err);
            message.error("Failed to load books");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(URL_CATEGORY);
            setCategories(response.data.map(cat => ({
                label: cat.name,
                value: cat.id
            })));
        } catch (err) { 
            console.error("❌ Fetch categories failed:", err);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchCategories();
    }, []);

    const handleAddBook = async (book) => {
        try {
            await axios.post(URL_BOOK, book);
            message.success("เพิ่มหนังสือสำเร็จ! 📚");
            fetchBooks();
        } catch (err) { 
            console.error("❌ Add book failed:", err); 
            message.error("เพิ่มหนังสือไม่สำเร็จ");
        }
    };

    const handleDeleted = async (id) => {
        try {
            await axios.delete(`${URL_BOOK}/${id}`);
            message.success("ลบหนังสือเรียบร้อย 🗑️");
            fetchBooks();
        } catch (err) { 
            console.error("❌ Delete failed:", err);
            message.error("ลบไม่สำเร็จ");
        }
    };

    const handleLikeBook = async (book) => {
        try {
            console.log("🔵 Attempting to Like Book ID:", book.id);
            const response = await axios.post(`${URL_BOOK}/${book.id}/like`);
            console.log("✅ Like Success:", response.data);
            message.success(`Liked "${book.title}" 👍`);
            fetchBooks();
        } catch (err) {
            console.error("❌ Like Failed:", err.response || err);
            const errorMsg = err.response?.data?.message || err.message || "Unknown error";
            message.error(`Cannot Like: ${errorMsg}`);
        }
    };

    const handleEdit = (record) => {
        setEditItem(record);
    };

    const handleUpdateBook = async (values) => {
        try {
            const { id, category, createdAt, updatedAt, likeCount, ...updateData } = values;
            
            if (updateData.price) updateData.price = parseFloat(updateData.price);
            if (updateData.stock) updateData.stock = parseInt(updateData.stock);

            console.log("📝 Updating book ID:", editItem.id, "Data:", updateData);
            
            await axios.patch(`${URL_BOOK}/${editItem.id}`, updateData);
            
            setEditItem(null); 
            fetchBooks();
            message.success("แก้ไขข้อมูลสำเร็จ! 🎉");

        } catch (err) { 
            console.error("❌ Update Failed:", err.response || err);
            const serverError = err.response?.data?.message || err.message;
            message.error(`บันทึกไม่สำเร็จ: ${serverError}`);
        }
    };

    const totalAmount = bookData.reduce((sum, book) => sum + (book.price * book.stock), 0);

    return (
        <Layout style={{ minHeight: '100vh' }}> 
            <Header style={{ 
                backgroundColor: '#fff', 
                padding: '0 50px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid #f0f0f0', 
                height: '64px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                <h1 style={{ margin: 0, fontSize: '24px', color: '#1890ff', fontWeight: 600 }}>
                    📚 BookNook Inventory
                </h1>
                {props.onLogout && <Button danger onClick={props.onLogout}>Logout</Button>}
            </Header>

            <Content style={{ padding: '0 50px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
                <div style={{ margin: '0 auto', paddingTop: '20px', maxWidth: '1400px' }}>
                    
                    <Dashboard data={bookData} loading={loading} />
   
                    <div style={{ 
                        padding: '20px', 
                        marginBottom: '20px', 
                        backgroundColor: '#fff', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        margin: '20px 0'
                    }}>
                        <AddBook onBookAdded={handleAddBook} categories={categories} />
                    </div>
    
                    <Divider style={{ 
                        borderColor: '#ccc', 
                        fontWeight: 'bold', 
                        color: '#555' 
                    }}>
                        📦 Book List (Total Value: ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                    </Divider>
    
                    <div style={{ paddingBottom: '30px' }}>
                        <Spin spinning={loading} tip="Loading books...">
                            <BookList
                                data={bookData}
                                onDeleted={handleDeleted}
                                onEdit={handleEdit}
                                onLiked={handleLikeBook}
                            />
                        </Spin>
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