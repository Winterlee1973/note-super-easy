
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
router.post("/register", async (req,res)=>{
  const {email,password}=req.body;
  try{
    const hashed = await bcrypt.hash(password,10);
    const {rows}=await pool.query("INSERT INTO users(email,password) VALUES($1,$2) RETURNING id,email",[email,hashed]);
    res.status(201).json(rows[0]);
  }catch{ res.status(400).json({error:'Email in use?'}); }
});
router.post("/login", async (req,res)=>{
  const {email,password}=req.body;
  const {rows}=await pool.query("SELECT * FROM users WHERE email=$1",[email]);
  if(!rows.length) return res.status(400).json({error:'Bad creds'});
  if(!(await bcrypt.compare(password,rows[0].password))) return res.status(400).json({error:'Bad creds'});
  const token = jwt.sign({id:rows[0].id,email},process.env.JWT_SECRET,{expiresIn:'1h'});
  res.json({token});
});
export default router;
