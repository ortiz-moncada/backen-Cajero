const socket = io(); 

//mensaje para el admin
socket.on('connect', function() {
  console.log('conectado al servidor');
});
socket.on('disconnect', function() {
  console.log('Se perdio la coneccion con el servidor');
});


//Enviar mensaje
socket.emit('enviarMensaje',{
    texto:'hola'
});


//escuchar mensaje
socket.on('enviarMensaje', function(mensaje){
    console.log(mensaje)
})
