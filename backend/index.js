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

app.use(express.json());
connectDb();
app.use(cors());

app.use('/api/user',UserRoutes);
app.use('/api/auction',AutionRoutes);
app.use('/api/location',LocationRoutes);
app.use('/api/item',ItemRoutes);

const port=process.env.PORT||3500;
app.listen(port,()=>{
    console.log(`app running on port : ${port}`);
});