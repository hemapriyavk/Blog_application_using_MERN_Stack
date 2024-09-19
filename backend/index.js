const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


require('dotenv').config();
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/',blogRoutes);


mongoose.connect(process.env.DB_URL).then((result)=>{
    // console.log(result);
    app.listen(PORT, ()=>{
        console.log(`Server is listening on PORT: ${PORT}`);
    })
}).catch(err=>{
    console.log(err);
});


