const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.model.js');

router.get("/get-all-blogs", async (req, res) => {
    const { page = 1, limit = 10, search, category } = req.query;
    const query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    
    try {
        const blogs = await Blog.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Blog.countDocuments(query);
        res.json({ total: count, blogs });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to retrieve blogs" });
    }
});
  

router.get("/blog/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const response = await Blog.findById(id);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({message: "something went wrong"});
    }
});

router.post("/create-blog", async (req,res)=>{
    try{
        const data = req.body;
        const blog = new Blog(data);
        const response = await blog.save();
        res.status(201).send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({message:"something went wrong!"});
    }
});

router.put("/blog/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        const response = await Blog.findByIdAndUpdate(id,data,{returnOriginal:false});
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({message: "something went wrong"});
    }
});

router.delete("/blog/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const response = await Blog.findByIdAndDelete(id);
        res.send("Success!");
    }catch(err){
        console.log(err);
        res.status(400).send({message: "something went wrong"});

    }
});

module.exports = router;
