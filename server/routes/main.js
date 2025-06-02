const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');
//const axios = require('axios');
const post = require('../models/Post')
const chat = require('../models/chat')
const allowedImages = ['Logos.png','test2.jpg','hero-image.webp','Signature.png','blob.svg','sign.png']
//Routes
router.get('/images/:img', async(req,res) =>{
    const PUBLIC_IMAGES_DIR = path.resolve('public', 'images');
      const referer = req.get('referer') || '';
      const imageName = req.params.img;
      const imgPath = path.join(PUBLIC_IMAGES_DIR,imageName);
      //console.log(2);
      try{
        console.log(imgPath)
        //Accessed existing image
        if(allowedImages.includes(imageName)){
            if(!referer.includes('index.html')){
                //request
                console.log(2);
                const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                const prompt = req.query.info;
        console.log('Direct access detected From IP: ', ip)
        console.log('Prompt: ', req.query.info)
        const record = {
            ip: ip, Prompt: prompt
        }
        
        const response = await chat.insertOne(record);
      
            }

       res.sendFile(imgPath);
        }
        //Tried to access non-existing image
        else{
            res.status(404).send("Image not found");
        }

      }catch(error){
        console.log(error);
        res.status(500).send('Server Error')
      }
      

})






router.get('',async(req,res)=>{

    const locals = {
        title : "NodeJs Blog",
        description : "Simple Blog created with NodeJs, Express & MongoDB"
    }

    try{
        const data = await post.find();
        res.render('index',{data});
    }catch(error){
        console.log(error)
    }
    
})








router.get('/About',(req,res)=>{
    res.render('about');
})
module.exports = router