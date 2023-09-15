import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import stories from "./routes/story.mjs";
import OpenAI from "openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import path from "path";


// starters


const openAI_API = "";
const PINECONE_API = "";
const PINECONE_ENV = "";
const PINECONE_INDEX = "";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares

app.set('trust proxy', true); 
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(process.cwd() + '/public')));

// OPEN-AI INITIALIZATION

const openai = new OpenAI({
    apiKey: openAI_API
});

// PINECONE DATABASE INITIALIZATION    

    const pinecone = new PineconeClient();      

    await pinecone.init({      
        environment: PINECONE_ENV,      
        apiKey: PINECONE_API,      
    });          

    const index = pinecone.Index(PINECONE_INDEX);

// REST APIs 

app.use("/stories" ,stories);

// server listning...

app.listen(port,()=>{
    console.log("server started");
})

// exports..

export {index,openai};