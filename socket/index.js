const io = require('socket.io')(8900,{
    cors:{
        origin:'http://localhost:3000'
    }
});


let users = [];

const addUser = (userId, socketId) => {
    console.log('agreganod usuario a la lista');
    !users.some((user)=>user.userId === userId) &&
        users.push({userId,socketId});
}

const removeUser = (socketId) => {
    //actualiza la lista sacando
    //a los usuarios desconectados
    users = users.filter((user)=>user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find((user)=>user.userId === userId)
}

io.on('connection', (socket) => {
    //cuando se conecta
    console.log('a user connected');
    console.log(users);

    //mandar mensaje a todos
    //io.emit('welcome', 'hola este es mis server socket');

    //take userId and socketId from user
    socket.on('addUser', userId=>{
        //agrega un usuario a la lista de onlines
        addUser(userId, socket.id);

        //devuelve todos los usuarios conectados
        io.emit('getUsers', users);
    });


    //send and get message
    socket.on('sendMessage', ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit('getMessage',{
            senderId,
            text,
        });
    })

    
    //cuando se desconecta
    socket.on('disconnect', () => {
        console.log('a user disconnected!');
        removeUser(socket.id);
        //muestra la nueva lista online
        io.emit('getUsers', users);
    });
})