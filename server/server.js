// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Permitir CORS desde tu frontend (por ejemplo localhost:5173)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

let contadorTicket = 0; // Empieza en 0

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('solicitar-ticket', (data) => {
    console.log('Nombre recibido:', data.name);

    // Incrementar el contador
    contadorTicket++;

    // Enviar a todos los clientes el nuevo ticket
    io.emit('ticket-creado', { ticket: contadorTicket, name: data.name });
  });

  // Agregar el manejo del evento ticket-atendido
  socket.on('ticket-atendido', (data) => {
    console.log('Ticket atendido:', data);
    
    // Emitir a todos los clientes el ticket que se está atendiendo
    io.emit('ticket-atendido', data);
  });
});

app.get('/', (req, res) => {
  res.send('Servidor Socket.io funcionando 🚀');
});

server.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});