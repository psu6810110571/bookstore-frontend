import { useState } from 'react';
// ✅ เพิ่ม: นำเข้า Card, Typography, Space เพื่อจัดหน้าตา และ Layout
import { Button, Form, Input, Alert, Card, Typography, Space } from 'antd';
// ✅ เพิ่ม: นำเข้าไอคอนเพื่อใช้ตกแต่งช่องกรอกข้อมูลและหัวข้อ
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const URL_AUTH = "/api/auth/login";

export default function LoginScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    const handleLogin = async (formData) => {
        try {
            setIsLoading(true);
            setErrMsg(null);

            const response = await axios.post(URL_AUTH, {
                username: formData.username,
                password: formData.password
            });

            const token = response.data.access_token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            props.onLoginSuccess();

        } catch (err) {
            console.error(err);
            // ✅ ปรับปรุง: Logic การแสดง Error ให้ครอบคลุมและข้อความสุภาพขึ้น
            let message = "Login failed. Please check your credentials.";
            if (err.response && err.response.data && err.response.data.message) {
                message = err.response.data.message;
            }
            setErrMsg(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // ✅ ปรับปรุง 1: Wrapper ด้านนอกสุด
        // - ใช้ Flexbox (display: flex...) เพื่อดึงทุกอย่างมาไว้ "กึ่งกลางหน้าจอ" ทั้งแนวตั้งและแนวนอน
        // - ใส่สีพื้นหลัง (backgroundColor) ให้ไม่เป็นสีขาวโล้นๆ
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f2f5' 
        }}>
            {/* ✅ เพิ่ม 2: ใช้ <Card> เป็นกรอบหลัก */}
            {/* - ช่วยให้ฟอร์มดูลอยมีมิติด้วย boxShadow */}
            {/* - กำหนดความกว้าง (width: 400) ให้พอดี ไม่ยืดเต็มจอ */}
            <Card
                style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                bordered={false}
            >
                {/* ✅ เพิ่ม 3: ส่วน Header ของการ์ด */}
                {/* - ใส่ Logo (Icon) และชื่อแอพ (Title) */}
                {/* - ใส่คำต้อนรับ (Text) ให้ดูเป็นมิตร */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Space align="center">
                        <LoginOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                        <Title level={2} style={{ margin: 0 }}>Bookstore</Title>
                    </Space>
                    <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                        Welcome back! Please login to continue.
                    </Text>
                </div>

                <Form
                    name="login-form"
                    // ✅ ปรับปรุง 4: เปลี่ยน Layout เป็น 'vertical'
                    // - ป้ายชื่อ (Label) จะไปอยู่ด้านบนของช่องกรอกข้อมูล แทนที่จะอยู่ด้านข้าง
                    layout="vertical" 
                    onFinish={handleLogin}
                    autoComplete="off"
                    // ✅ ปรับปรุง 5: เพิ่มขนาด Component
                    // - size="large" ทำให้ช่อง Input และปุ่มกดดูใหญ่ขึ้น กดง่าย
                    size="large" 
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        {/* ✅ เพิ่ม 6: ใส่ Icon (prefix) ในช่อง Input */}
                        {/* - ใส่รูปคน (UserOutlined) เพื่อสื่อความหมาย */}
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        {/* ✅ เพิ่ม 7: ใส่ Icon (prefix) ในช่อง Password */}
                        {/* - ใส่รูปกุญแจ (LockOutlined) */}
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item>
                        {/* ✅ ปรับปรุง 8: ปุ่ม Submit */}
                        {/* - block: ให้ปุ่มยาวเต็มความกว้าง */}
                        {/* - shape="round": ให้ปุ่มมีขอบมน ดูทันสมัย */}
                        <Button type="primary" htmlType="submit" loading={isLoading} block shape="round" style={{ fontWeight: 'bold' }}>
                            LOG IN
                        </Button>
                    </Form.Item>

                    {errMsg &&
                        <Form.Item>
                            {/* ✅ ปรับปรุง 9: Alert Box */}
                            {/* - showIcon: แสดงไอคอนกากบาท */}
                            {/* - closable: ให้ user กดปิดข้อความ error ได้เอง */}
                            <Alert message={errMsg} type="error" showIcon closable onClose={() => setErrMsg(null)} />
                        </Form.Item>
                    }
                </Form>
            </Card>
        </div>
    );
}