import express from "express";
import { getData,setData,deleteData, EditData,getSingle } from "../controllers/story.mjs";
const router = express.Router()

router.get("/",(reqs,resp)=>{
    getData(reqs,resp);
});

router.get("/search",(reqs,resp)=>{
    getSingle(reqs,resp);
});

router.post("/",(reqs,resp)=>{
    setData(reqs,resp);
});

router.delete("/:id",(reqs,resp)=>{
    deleteData(reqs,resp);
});

router.put("/:id",(reqs,resp)=>{
    EditData(reqs,resp);
});


export default router;