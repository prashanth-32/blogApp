import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./db.js";
import Product from "./models/temp.model.js";
import cors from "cors"
import User from "./models/User.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from 'fs';
import Post from "./models/Post.model.js";
import path from "path";
import { fileURLToPath } from 'url'
import { env } from "process";
dotenv.config();


const salt = bcrypt.genSaltSync(10);
const app = express();
const secret = process.env.JWT_SECRET;
const upload = multer({dest:'uploads/'})
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({
  origin: 'https://blogapp-frontend-r0z0.onrender.com',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname + '/uploads')));

console.log(secret);

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`App started running at ${PORT}`);
    connectDB();
})

app.get('/',(req,res)=>{
    res.json("Is it Okk ?....!");
})

app.post('/register',async (req,res) =>{
  const userInfo = req.body;
  console.log(userInfo);
  if(!userInfo.username || !userInfo.password){
    return res.status(400).json({succes:false,message : "Need every field"});
  }
  try{
    const newUser = await User.create({username:userInfo.username,password:bcrypt.hashSync(userInfo.password,salt)});
    res.status(200).json({succes:true,message:`${newUser}`});
  }
  catch(err){
    console.error(err);
    res.status(400).json({succes:false,message:`${err}`});
  }
})

app.post('/login',async (req,res)=>{
  const {username,password} = req.body;
  try{
    const user = await User.findOne({username});
    const passOk = bcrypt.compareSync(password,user.password);
    if(passOk){ 
      jwt.sign({username,id:user._id},secret,{},(err,token) =>{
        if(err) throw err;
        res.cookie('token',token).json({ 
          id:user._id,
          username : user.username
        });
      })
    }
      else return res.status(400).json({success:false,message:`Not Found`})
  }
  catch(err){
    res.status(400).json({succes:false,message:"Invalid credentials"})
  }
})

app.post('/logout',(req,res)=>{
  res.cookie('token','').json('ok');
})

app.get('/profile',(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token,secret,{},(err,info)=>{
    if(err) throw err;
    res.json(info);
  });
});

app.post('/post',upload.single('file'), async (req,res) =>{
  const {originalname,path} = req.file || null;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path,newPath);


  const {token} = req.cookies;
  jwt.verify(token,secret,{},async (err,info)=>{
    if(err) throw err;
    const {title,summary,content} = req.body;
    const newPost = await Post.create({title,summary,content,cover:newPath,author:info.id});
    res.json(newPost);
  });
})

app.get('/post',async (req,res)=>{
  res.json(await Post.find().populate('author',['username']).sort({createdAt: -1}));
})

app.get('/post/:id',async (req,res)=>{
  const {id} = req.params;
  const info = await Post.findById(id).populate('author',['username']);
  res.json(info);
})

app.get('/edit/:id',async (req,res)=>{
  const {id} = req.params;
  const info = await Post.findById(id);
  res.json(info);
})

app.put('/update/:id',upload.single('file'),async (req,res) =>{
  let newPath = null;
  const postId = req.params.id;
  if(req.file){
    const {originalname,path} = req.file || null;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path,newPath);
  }
  const {token} = req.cookies;
  jwt.verify(token,secret,{},async (err,info)=>{
    if(err) throw err;
    const {title,summary,content,id} = req.body;
    const doc = await Post.findById(postId);
    const isOk = JSON.stringify(doc.author._id) === JSON.stringify(id);
    if(!isOk){
      return res.status(400).json("Your are not eligible to access");
      throw 'You are not author'
    }
    await doc.updateOne({title,summary,content,cover:newPath ? newPath:info.cover});
    res.json(doc);
  });
})

app.delete('/delete/:id',async (req,res)=>{
  const id = req.params.id;
  const doc = await Post.deleteOne({_id : id});
  res.status(200).json('ok');
})