const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// เมื่อมีการเชื่อมต่อ Socketเข้ามา
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // เมื่อมีออเดอร์ใหม่ส่งมาจากหน้าสั่งอาหาร (test.html)
    socket.on('new_order', (orderData) => {
        console.log('New Order Received:', orderData.id);
        // ส่งออเดอร์นี้ไปหาทุกเครื่องที่เปิดหน้าครัว (kitchen.html) อยู่ทันที
        io.emit('kitchen_receive_order', orderData);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});