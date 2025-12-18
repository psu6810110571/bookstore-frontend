import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'; // อย่าลืม import useEffect
import LoginScreen from './LoginScreen';
import BookScreen from './BookScreen';

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅✅ [เพิ่มส่วนนี้] เช็ค Token ตอนเปิดเว็บ (Remember Me)
  useEffect(() => {
    const token = localStorage.getItem('token'); // ลองหา Token ในเครื่อง
    if (token) {
      // ถ้ามี Token ให้ตั้งค่า axios และบอกว่าล็อกอินแล้ว
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // ลบ Token ออกเมื่อ Logout
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  } else {
    // ส่งปุ่ม Logout ไปให้ BookScreen ใช้ด้วย
    return <BookScreen onLogout={handleLogout} />;
  }
}

export default App;