import React, { useState } from 'react'

const Navbar = ({query,getdata}) => {

  const [searchValue,setSearchValue] = useState("");

  return (

    <div className='h-16 w-full  bg-slate-800 shadow-lg text-white flex items-center fixed top-0 '>
      <div className='font-bold text-3xl w-full hidden md:flex items-center h-full pl-4'>
            CRUD APP
      </div>
      <div className='w-full flex justify-center' >
        <form onSubmit={(e)=>{
            e.preventDefault();
            query(searchValue);
        }}  action="">
            <input onChange={(e)=>{
              e.preventDefault();
              setSearchValue(e.target.value);
            }}
            type="text" className='rounded-md w-44 text-black pl-3 md:w-64 h-10 me-4'  placeholder='  Search item'/>
            <button type='submit' className='p-2 rounded-md  bg-blue-500'  >Search</button>
        </form>
      </div>
    </div>
  )
}

export default Navbar;
