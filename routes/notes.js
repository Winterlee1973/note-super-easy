
import express from "express";
import { pool } from "../db.js";
import { authRequired } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", authRequired, async (req,res)=>{
  const {rows}=await pool.query("SELECT * FROM notes WHERE user_id=$1 ORDER BY id",[req.user.id]);
  res.json(rows);
});
router.post("/", authRequired, async (req,res)=>{
  const {title,content}=req.body;
  const {rows}=await pool.query("INSERT INTO notes(user_id,title,content) VALUES($1,$2,$3) RETURNING *",[req.user.id,title,content]);
  res.status(201).json(rows[0]);
});
router.delete("/:id", authRequired, async (req,res)=>{
  await pool.query("DELETE FROM notes WHERE id=$1 AND user_id=$2",[req.params.id,req.user.id]);
  res.status(204).end();
});
export default router;
