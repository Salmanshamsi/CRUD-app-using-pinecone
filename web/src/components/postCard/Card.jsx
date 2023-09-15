import React from 'react'

const Card = ({title, content, id, onDelete, setcardId, onModal, indx}) => {


  return (
        <>
            <div className='md:w-72 w-64  bg-slate-200 rounded-lg flex flex-col gap-3 text-slate-800 '>
            <div className='border w-full h-7 flex items-center justify-end pr-3 rounded-md gap-3' >
                <button onClick={(e)=>{
                    e.preventDefault();
                    onDelete(id,indx);
                }}  className='hover:text-red-600' ><i className="fa-solid fa-trash fa-md "></i></button>
                <button onClick={(e)=>{
                    e.preventDefault();
                    onModal(true);
                    // setcardId({id,indx});
                }} className='hover:text-green-600' ><i className="fa-solid fa-pen-to-square fa-md"></i></button>
            </div>
            <h1 className='font-bold text-2xl mx-8 ' >{title}</h1>
            <div className='text-lg mx-8 my-6 ' >
            {content}
            </div>
          </div>
        </>
  )
}

export default Card
