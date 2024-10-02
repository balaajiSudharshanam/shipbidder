const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const connectDb=require('./config/db');
dotenv.config();
const UserRoutes=require('./routes/UserRoutes');

app.use(express.json());
connectDb();
app.use(cors());

app.use('/api/user',UserRoutes);
const port=process.env.PORT||3500;
app.listen(port,()=>{
    console.log(`app running on port : ${port}`);
});