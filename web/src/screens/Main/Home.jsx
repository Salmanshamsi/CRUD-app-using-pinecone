import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Card from '../../components/postCard/Card'
import Modal from '../../components/createPost/Modal'
import axios from "axios";

const Home = () => {

  // loading spinner..

  const [loading,setloading] = useState("hidden");

//  modal controls...

  const [isOpen,setisOpen] = useState(false);

  const isClose = (value) => {
    setisOpen(value);
  }


  //   Get Handling...

  const [data,setData] = useState([]);

  const searchData = async (query) => {

    try {
      setloading("visible");
      const resp = await axios.get(`http://localhost:3000/stories/search?q=${query}`);
      console.log(resp.data);
      setData(resp.data);
      setloading("hidden");
    } catch (e) {
      setloading("visible");
      console.log(e);
    }
  }

  const searchHandler = (value) => {
    searchData(value);
  }

  const getData = async () => {
    let response = null;
    try {
            setloading("visible");
             response = await axios.get(`http://localhost:3000/stories/`);
            setData(response?.data);
            console.log("run get data");
            setloading("hidden");
          } catch (error) {
            console.error('Error fetching data:', error);
            response = error;
        }
}

  //   Delete Handling...


  const deleteData = async (id) => {

    try {
        setloading("visible");
        const response = await axios.delete(`http://localhost:3000/stories/${id}`);
        console.log(response?.data);
        getData();
        setloading("hidden")
      } catch (error) {
        console.error('Error fetching data:', error);
       }

}

  //   Post Handling...

  const PostData = async (title,content) => {

    try{
      setloading("visible");
        const data = {title,content};
        const resp = await axios.post(`http://localhost:3000/stories/`,data); 
        resp ? console.log("Data added Sucessfully")
        : console.log("Data not added Try Later");
        getData();
        setloading("hidden");
    }catch(e){
            console.log("Error on updating Request :", e);
    }

}

  //   PUT Handling...

  const [cardId,setCardId] = useState(null);

  const PutData = async (title,content,id) => {
    try{
     
        const data = {title,content};
        const resp = await axios.put(`http://localhost:3000/stories/${id}`,data); 
        resp ? console.log("Data updated Sucessfully") 
        : console.log("Data not update Try Later");
        getData();

    }catch(e){
            console.log("Error on updating Request :", e);
    }
}

useEffect(()=>{
  getData();
},[]);


  return (
    <div>
      
      <div className={`${loading} h-screen w-screen bg-slate-700 opacity-80 z-50 fixed top-0`} >
        <div className='h-screen w-screen flex items-center justify-center text-white'>
          <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
        </div>
      </div>

    {/* navigation Menu */}
    
      <Navbar query={searchHandler} getdata={getData}  />

    {/* Create Post Button */}

      <div className={`mt-16 ${(data.length <= 1)?"h-screen":"h-auto"} w-full bg-slate-500 text-white flex flex-col items-center justify-start`} >
        <button onClick={(e)=>{
            e.preventDefault();
            setisOpen(true)
        }} className='h-12 w-52 bg-blue-600 rounded-md mt-4 ' >Create Post</button>

    {/*Render Posts Card */}
         {
          data?data.map((CurEl,index)=>{
              return(
                <div key={index} className='mt-5' >
                  <Card  title={CurEl?.title} indx={index} content={CurEl?.content} id={CurEl?._id} setcardId={setCardId}  onDelete={deleteData}  onModal={setisOpen} />
                </div>
              )
          }):"no Data Found"
         }

    {/*Add product modal*/}

         <Modal isOpen={isOpen} isClose={isClose} onPost={PostData} onPut={PutData} id={cardId} cardId={setCardId} main={data} setMain={setData} />

      </div>
    </div>
  )
}

export default Home
