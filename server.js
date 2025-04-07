const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname))); // Serve semua file statis (termasuk index.html)

// Data user dan online list (simpan sementara)
let users = {};
let passwords = {};
let onlineUsers = {};

io.on('connection', (socket) => {
    console.log('User terhubung');

    socket.on('register', ({ user, pass }) => {
        if (!users[user]) {
            users[user] = socket.id;
            passwords[user] = pass;
            socket.emit('loginSuccess', user);
            onlineUsers[user] = socket.id;
            updateUserList();
        }
    });

    socket.on('login', ({ user, pass }) => {
        if (users[user] && passwords[user] === pass) {
            users[user] = socket.id;
            onlineUsers[user] = socket.id;
            socket.emit('loginSuccess', user);
            updateUserList();
        }
    });

    socket.on('chatMessage', ({ sender, message, image, to, time }) => {
        const payload = { sender, message, image, time };
        if (to && users[to]) {
            io.to(users[to]).emit('chatMessage', payload); // kirim private
            io.to(socket.id).emit('chatMessage', payload); // tampilkan juga di pengirim
        } else {
            io.emit('chatMessage', payload); // broadcast ke semua
        }
    });

    socket.on('disconnect', () => {
        const user = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);
        if (user) {
            delete onlineUsers[user];
            updateUserList();
        }
    });

    function updateUserList() {
        io.emit('userList', Object.keys(onlineUsers));
    }
});

server.listen(80, '0.0.0.0', () => {
    console.log('Server running on http://<IP-VPS>:3000');
});
