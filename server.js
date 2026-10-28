const express = require('express');
const path = require('path');
const app = express();

// Render จะส่งค่า PORT มาให้อัตโนมัติผ่าน process.env.PORT
const PORT = process.env.PORT || 3000;

app.use(express.json());

// เสิร์ฟไฟล์ Static (เช่น test.html, รูปภาพ, CSS)
app.use(express.static(path.join(__dirname)));

// สร้าง ตัวอย่าง API Endpoint สำหรับรองรับ dynamic request
app.get('/api/orders', (req, res) => {
    // โค้ดสำหรับดึงข้อมูลออเดอร์จากฐานข้อมูลส่งกลับไปที่หน้าเว็บ
    res.json({ status: 'success', data: [] });
});

// ส่งหน้า test.html เมื่อเปิดเข้ามาที่หน้าแรก
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});