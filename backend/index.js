const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js');


require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/',blogRoutes);

app.get('/',(req,res)=>{
    res.send("API Working")
});

mongoose.connect(process.env.DB_URL).then((result)=>{
    console.log("DB Connected");
    app.listen(PORT, ()=>{
        console.log(`Server is listening on PORT: ${PORT}`);
    })
}).catch(err=>{
    console.log(err);
});


