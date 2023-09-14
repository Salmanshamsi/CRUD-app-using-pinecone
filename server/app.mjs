import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import stories from "./routes/story.mjs";
import OpenAI from "openai";
import { PineconeClient } from "@pinecone-database/pinecone";

// starters


const openAI_API = "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";
const PINECONE_API = "f5178f19-1942-4a91-b053-5d5936855699";
const PINECONE_ENV = "gcp-starter";
const PINECONE_INDEX = "helloworld";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares

app.set('trust proxy', true); 
app.use(bodyParser.json());
app.use(cors());

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