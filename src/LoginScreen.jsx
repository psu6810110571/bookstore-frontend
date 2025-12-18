import { useState } from 'react';
import { Button, Form, Input, Alert, Card, Typography, Space, Checkbox } from 'antd';
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
            
            if (formData.remember) {
                localStorage.setItem('token', token);
            } else {
<<<<<<< HEAD
                sessionStorage.setItem('token', token);
=======
                localStorage.setItem('token', token); 
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
            }
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            props.onLoginSuccess();

        } catch (err) {
            console.error(err);
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
<<<<<<< HEAD
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
=======
        // ✅ แก้ไข: ใช้ position: 'fixed' เพื่อบังคับให้เต็มจอ ไม่สนกรอบ #root เดิม
        <div style={{
            position: 'fixed', // ลอยตัวออกมาจาก Layout ปกติ
            top: 0,
            left: 0,
            width: '100vw',    // กว้างเต็มจอ 100%
            height: '100vh',   // สูงเต็มจอ 100%
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
<<<<<<< HEAD
            overflow: 'hidden'
=======
            overflow: 'hidden' // กัน Scrollbar เกิน
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
        }}>
            <Card
                style={{ 
                    width: 400, 
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)', 
                    borderRadius: '12px',
<<<<<<< HEAD
                    backdropFilter: 'blur(5px)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none'
                }}
=======
                    // เพิ่ม Backdrop ให้ตัวการ์ดเด่นขึ้นอีกนิด (Optional)
                    backdropFilter: 'blur(5px)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
                bordered={false}
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
            >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Space align="center">
                        <LoginOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
<<<<<<< HEAD
                        <Title level={2} style={{ margin: 0 }}>BookNook</Title>
=======
                        <Title level={2} style={{ margin: 0 }}>Bookstore</Title>
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
                    </Space>
                    <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                        Welcome back! Please login to continue.
                    </Text>
                </div>

                <Form
                    name="login-form"
                    layout="vertical"
                    onFinish={handleLogin}
                    autoComplete="off"
                    size="large"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
<<<<<<< HEAD
                        <Input prefix={<UserOutlined />} placeholder="demo" />
=======
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter username" />
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
<<<<<<< HEAD
                        <Input.Password prefix={<LockOutlined />} placeholder="1234" />
=======
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter password" />
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

<<<<<<< HEAD
                        <a style={{ float: 'right' }} href="#forgot">
=======
                        <a style={{ float: 'right' }} href="">
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
                            Forgot password?
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading} block shape="round" style={{ fontWeight: 'bold' }}>
                            LOG IN
                        </Button>
                    </Form.Item>

<<<<<<< HEAD
                    <div style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: 8 }}>
                        Demo: demo / 1234
=======
                    <div style={{ textAlign: 'center' }}>
                        Don't have an account? <a href="">Register now!</a>
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
                    </div>

                    {errMsg &&
                        <div style={{ marginTop: 24 }}>
                            <Alert message={errMsg} type="error" showIcon closable onClose={() => setErrMsg(null)} />
                        </div>
                    }
                </Form>
            </Card>
        </div>
    );
}