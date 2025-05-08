
import { execSync } from "child_process";
import fs from "fs";
import dotenv from "dotenv";
import pkg from "pg";
dotenv.config();
const dbUrl = process.env.DATABASE_URL;
const dbName = dbUrl.split('/').pop();
try { execSync(`createdb ${dbName}`, { stdio: 'ignore' }); } catch {}
const { Client } = pkg;
const client = new Client({ connectionString: dbUrl });
await client.connect();
await client.query(fs.readFileSync('migrations.sql','utf8'));
await client.end();
console.log('✓ Database ready');
