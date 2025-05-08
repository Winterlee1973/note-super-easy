
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import { pool } from "./db.js";

dotenv.config();
async function migrate() {
  const sql = fs.readFileSync("migrations.sql","utf8");
  await pool.query(sql);
  console.log("✓ Migrations applied");
}
await migrate();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use("/notes", noteRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"public")));
app.get("*", (_,res)=>res.sendFile(path.join(__dirname,"public/index.html")));
app.listen(PORT, ()=>console.log(`🚀 Open http://localhost:${PORT}`));
