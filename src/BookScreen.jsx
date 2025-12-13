import { useState, useEffect } from 'react';
import { Layout, Divider, Button, message } from 'antd'; // เพิ่ม message เพื่อแจ้งเตือนสวยๆ
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

    const fetchBooks = async () => {
        try {
            const response = await axios.get(URL_BOOK);
            setBookData(response.data);
        } catch (err) { console.log(err); }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(URL_CATEGORY);
            setCategories(response.data.map(cat => ({
                label: cat.name,
                value: cat.id
            })));
        } catch (err) { console.log(err); }
    };

    useEffect(() => {
        fetchBooks();
        fetchCategories();
    }, []);

    // ✅ ฟังก์ชันเพิ่มหนังสือ (รับค่ามาจาก AddBook แล้วยิง API ที่นี่)
    const handleAddBook = async (book) => {
        try {
            await axios.post(URL_BOOK, book);
            message.success("เพิ่มหนังสือสำเร็จ! 📚");
            fetchBooks();
        } catch (err) { 
            console.log(err); 
            message.error("เพิ่มหนังสือไม่สำเร็จ");
        }
    };

    const handleDeleted = async (id) => {
        try {
            await axios.delete(`${URL_BOOK}/${id}`);
            message.success("ลบหนังสือเรียบร้อย 🗑️");
            fetchBooks();
        } catch (err) { console.log(err); }
    };

    // ✅✅ [เพิ่มฟังก์ชันนี้] เพื่อให้ปุ่ม Like ทำงาน
    const handleLikeBook = async (book) => {
        try {
            // ยิง API ไปที่ POST /api/book/:id/like ตามสไลด์หน้า 8
            await axios.post(`${URL_BOOK}/${book.id}/like`);
            fetchBooks(); // โหลดข้อมูลใหม่ให้นับ Like เพิ่มทันที
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
            // ตัดค่าที่ไม่ต้องการส่งไป Backend ออก (ตามสไลด์หน้า 35)
            const { id, category, createdAt, updatedAt, ...updateData } = values;
            if (updateData.price) updateData.price = parseFloat(updateData.price);
            if (updateData.stock) updateData.stock = parseInt(updateData.stock);

            await axios.patch(`${URL_BOOK}/${editItem.id}`, updateData);
            
            setEditItem(null); 
            fetchBooks();
            message.success("แก้ไขข้อมูลสำเร็จ! 🎉");

        } catch (err) { 
            console.log("❌ Update Failed:", err);
            const serverError = err.response?.data?.message || err.message;
            message.error(`บันทึกไม่สำเร็จ: ${JSON.stringify(serverError)}`);
        }
    };

    const totalAmount = bookData.reduce((sum, book) => sum + (book.price * book.stock), 0);

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
                <div style={{ margin: '0 auto', paddingTop: '20px' }}>
                    
                    <Dashboard data={bookData} />
   
                    <div style={{ 
                        padding: '20px', 
                        marginBottom: '20px', 
                        backgroundColor: '#fff', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        maxWidth: '1280px', 
                        margin: '0 auto'
                    }}>
                        {/* ส่ง categories ไปให้ Dropdown */}
                        <AddBook onBookAdded={handleAddBook} categories={categories} />
                    </div>
    
                    <Divider orientation="left" style={{ 
                        borderColor: '#ccc', 
                        fontWeight: 'bold', 
                        color: '#555' 
                    }}>
                        📦 Book List (Total Value: {totalAmount.toLocaleString()} USD)
                    </Divider>
    
                    <div style={{ paddingBottom: '30px' }}>
                        <BookList
                            data={bookData}
                            onDeleted={handleDeleted}
                            onEdit={handleEdit}
                            onLiked={handleLikeBook} /* ✅ ใส่ฟังก์ชัน Like ตรงนี้ */
                        />
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