const {io} = require('../server');

io.on('connection', (client) => {
    console.log('Usuario conetado')

    client.on('disconnect', () => {
        console.log('usuario desconectado');
    });


    //Enviar mensaje desde el servidor
    client.emit('enviarMensaje', {
        mensaje: 'Bienvenidos'
    });


    //escuchar cliente 
    client.on('enviarMensaje', (mensaje) => {
        console.log(mensaje)
    })

    

});