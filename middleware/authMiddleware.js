
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function authRequired(req,res,next){
  const token = req.headers['authorization']?.split(' ')[1];
  if(!token) return res.status(401).json({error:'Missing token'});
  jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
    if(err) return res.status(403).json({error:'Bad token'});
    req.user = user; next();
  });
}
