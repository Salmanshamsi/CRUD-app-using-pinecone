import { useState } from "react";


const Modal = ({ isOpen ,isClose, onPost, onPut, id,cardId , main, setMain}) => {

  const [title,setTitle] = useState(null);
  const [content,setContent] = useState(null);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
       {/* Body */}
          <div className="relative p-6 flex-auto">
              <form onSubmit={(e)=>{
                e.preventDefault();
                 (id) ? onPut(title,content,id) : onPost(title,content);
                 setMain([...main]);
                 isClose(false);
                cardId(null);
              }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  {(id) ? "Update Title" : "Add Title" }
                  </label>
                  <input onChange={(e)=>{
                    e.preventDefault();
                    setTitle(e.target.value);
                  }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title"/>
                  {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div className="mb-4">
                   <label htmlFor="comment" className="block text-gray-600 font-medium">{(id) ? "Update content" : "Add content" }</label>
                   <textarea onChange={(e)=>{
                    e.preventDefault();
                    setContent(e.target.value);
                  }} id="comment" name="comment" rows={4} placeholder="Your content" className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black" defaultValue={""} />
               </div>
                <div className="flex items-center justify-between">
                  <button type="submit" className='h-12 w-20 bg-blue-600  rounded-lg hover:text-blue-600 hover:border hover:bg-transparent hover:shadow-sm shadow-lg  ' >Add</button>
                  <button onClick={(e)=>{
                    e.preventDefault();
                    cardId(null);
                   isClose(false);
                  }}  className='h-12 w-20 bg-transparent text-blue-600 border hover:text-white hover:bg-blue-600 hover:shadow-sm shadow-lg  rounded-lg' type="button">
                    close
                  </button>
                </div>
              </form>
          </div>
      </div>
    </div>
  );
};

export default Modal;
