require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
app.use(helmet());
app.use(cors({origin: allowedOrigin, methods:["GET","POST","OPTIONS"], allowedHeaders:["Content-Type","Authorization"]}));
app.use(express.json({limit:"100kb"}));
app.get("/", (_req,res)=>res.json({name:"Daisha Outreach AI API",status:"running",note:"Starter backend only; social providers are not connected yet."}));
app.get("/health", (_req,res)=>res.json({ok:true,service:"daisha-outreach-ai-api",timestamp:new Date().toISOString()}));
app.get("/api/connections", (_req,res)=>res.json({
 instagram:{configured:Boolean(process.env.INSTAGRAM_CLIENT_ID&&process.env.INSTAGRAM_CLIENT_SECRET),connected:false},
 tiktok:{configured:Boolean(process.env.TIKTOK_CLIENT_KEY&&process.env.TIKTOK_CLIENT_SECRET),connected:false},
 x:{configured:Boolean(process.env.X_CLIENT_ID&&process.env.X_CLIENT_SECRET),connected:false}
}));
app.get("/api/oauth/:provider/start",(req,res)=>{
 const provider=String(req.params.provider||"").toLowerCase();
 if(!["instagram","tiktok","x"].includes(provider)) return res.status(404).json({error:"Unknown provider."});
 return res.status(501).json({error:"OAuth is not configured yet.",provider,nextStep:"Register the app with the platform, set server-side client credentials and redirect URI, then implement its current OAuth flow and approved scopes."});
});
app.post("/api/comments",(_req,res)=>res.status(501).json({
 status:"not_implemented",error:"Comment publishing is not connected. No comment was posted.",
 note:"Only implement actions supported by the platform's official API and granted permissions."
}));
app.use((err,_req,res,_next)=>{console.error("Unhandled request error:",err.message);res.status(500).json({error:"Internal server error."});});
app.listen(port,()=>console.log(`Daisha Outreach AI API listening on port ${port}`));
