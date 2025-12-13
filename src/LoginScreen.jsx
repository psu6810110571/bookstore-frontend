import { useState } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import axios from 'axios';

const URL_AUTH = "/api/auth/login";

export default function LoginScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    const handleLogin = async (formData) => {
        try {
            setIsLoading(true);
            setErrMsg(null);

            // 1. ส่ง Username/Password ไปล็อกอิน
            const response = await axios.post(URL_AUTH, {
                username: formData.username, 
                password: formData.password
            });

            // 2. ดึง Token ออกมา
            const token = response.data.access_token; 

            // ✅✅ [เพิ่มบรรทัดนี้] บันทึก Token ลงเครื่อง (สำคัญมาก!)
            localStorage.setItem('token', token);

            // 3. เอา Token ไปแปะไว้ใน Header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // 4. แจ้ง App.jsx ว่าล็อกอินสำเร็จ
            props.onLoginSuccess();

        } catch (err) {
            console.log(err);
            setErrMsg(err.response?.data?.message || err.message); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form
            name="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: 'auto', marginTop: '50px' }}
            onFinish={handleLogin}
            autoComplete="off"
        >
            <h2 style={{ textAlign: 'center' }}>Login</h2>

            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>

            {errMsg &&
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Alert message={errMsg} type="error" />
                </Form.Item>
            }
        </Form>
    );
}