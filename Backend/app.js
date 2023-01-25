const User=require('./Models/user');
const Exercise=require('./Models/Exercises');
const exRoutes=require('./Routes/exerciseRoutes'); 
const express=require('express');
const app=express();
const mongoose=require('mongoose');


const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded());


app.use(cookieParser());

const cors=require('cors');
const { response } = require('express');

app.use(cors({
    origin: ['http://localhost:3000/login', 
    'http://localhost:3000',
    'localhost:3000',
    'localhost:3000/login',
    ],
    credentials:true
  }));
  

const PORT= process.env.PORT||8000; 

dbURI='take_from_env';
mongoose.connect(dbURI)
.then(response=>app.listen(PORT,()=>console.log(`listening to port ${PORT}`)))
.catch(err=>console.log('ERROR CONNECTION TO DATABASE==',err));

app.use(exRoutes);




