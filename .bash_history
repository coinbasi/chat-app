shutdown
sudo nano /etc/netplan/00-installer-config.yaml
sudo netplan apply
ls
npm init -y
npm install express socket.io
sudo apt install nano
node -v
npm -v
ls
nano server.js
mkdir public
nano public/index.html
ls
cd public
nano index.html
cd chat-app
cd ubuntu/chat-app
cd storage
cd ..
ls
nano server.js
ls
[200~sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm -y
mkdir chat-app
cd chat-app
ls
nano server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.join(__dirname, 'public')));
let users = {};
io.on('connection', (socket) => {
});
server.listen(3000, '0.0.0.0', () =
sudo reboot
