import express from "express"
const app = express();

import bodyParser from "body-parser";
import cors from "cors";
import stories from "./routes/story.mjs";
import OpenAI from "openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import path from "path";
import "./config/index.mjs";


// OPEN-AI INITIALIZATION

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API
});

// PINECONE DATABASE INITIALIZATION    

const pinecone = new PineconeClient();      

await pinecone.init({      
    environment: 'gcp-starter',      
    apiKey: 'f5178f19-1942-4a91-b053-5d5936855699',      
});          

const index = pinecone.Index('helloworld');

// Middlewares

app.set('trust proxy', true); 
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(process.cwd() + '/public')));

// REST APIs 

app.use("/stories" ,stories);

// server listning...

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("server started");
})

// exports..

export {index,openai};