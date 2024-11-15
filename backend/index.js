const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const connectDb=require('./config/db');
dotenv.config();
const UserRoutes=require('./routes/UserRoutes');
const AutionRoutes=require('./routes/AuctionRoutes');
const LocationRoutes=require('./routes/LocationRoutes');
const ItemRoutes=require('./routes/ItemRoutes');
const { initSocket } = require('./Socket/socket');

app.use(express.json());
connectDb();
app.use(cors());

app.use('/api/user',UserRoutes);
app.use('/api/auction',AutionRoutes);
app.use('/api/location',LocationRoutes);
app.use('/api/item',ItemRoutes);

const port=process.env.PORT||3500;

const server=app.listen(port,()=>{
    console.log(`app running on port : ${port}`);
});
// const io=require('socket.io')(server,{
//     pingTimeout:60000,
//     cors:{
//         origin:"http://localhost:5173"
//     },
// });

const io=initSocket(server);
io.on("connect",(socket)=>{
    console.log("connected to socket.io");

    socket.on('setup',(room)=>{
        socket.join(room);
        console.log(room);
        socket.emit("connected");
    })
});
