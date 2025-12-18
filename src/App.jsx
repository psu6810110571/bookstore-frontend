import './App.css';
import axios from 'axios';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState, useEffect } from 'react'; // อย่าลืม import useEffect
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
import LoginScreen from './LoginScreen';
import BookScreen from './BookScreen';

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
=======
  // ✅✅ [เพิ่มส่วนนี้] เช็ค Token ตอนเปิดเว็บ (Remember Me)
  useEffect(() => {
    const token = localStorage.getItem('token'); // ลองหา Token ในเครื่อง
    if (token) {
      // ถ้ามี Token ให้ตั้งค่า axios และบอกว่าล็อกอินแล้ว
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
<<<<<<< HEAD
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
=======
    localStorage.removeItem('token'); // ลบ Token ออกเมื่อ Logout
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  } else {
<<<<<<< HEAD
=======
    // ส่งปุ่ม Logout ไปให้ BookScreen ใช้ด้วย
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
    return <BookScreen onLogout={handleLogout} />;
  }
}

export default App;