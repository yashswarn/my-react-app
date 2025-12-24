import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
const Home = () => {
    const [title,setTitle]=useState("");
    const [value,setValue]=useState('');
    const [searchParams,setSearchParams]=useSearchParams();
    const pasteId=searchParams.get("pasteId");
    const dispatch=useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes);

    useEffect(()=>{
        console.log("Inside use Effect");
        if (pasteId) {
            const paste=allPastes.find((p)=>p._id===pasteId);
            console.log("Page Found")
            setTitle(paste.title);
            setValue(paste.content);            
        }
    },[pasteId])

    function createPaste(){
        const paste={
            title:title,
            content:value,
            _id:pasteId || Date.now().toString(36),
            createdAt:new Date().toISOString(),
        }
        if(pasteId){
            // update
            dispatch(updateToPastes(paste));
        }
        else{
            // create
            dispatch(addToPastes(paste))
        }

        // after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

  return (
    <div>
    <div className='input-div flex flex-col gap-4  sm:gap-6 lg:flex-row'>
        <input
            className='border  border-gray-300 px-5 py-2  sm:min-w-[550px] md:min-w-[850px] lg:min-w-[1025px] rounded  bg-white text-black'
            type='text'
            placeholder='Enter title here'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
        />

        <button onClick={createPaste} className='min-w-[100px] rounded bg-blue-600 text-1xl text-center'>
        {
            pasteId?"Update":"Create"
        }
        </button>   
    </div>
    <div className='text-area-div mt-8'>
        <textarea
            className=' text-area pt-3 border border-gray-300 rounded min-w-[360px] sm:min-w-[750px] md:min-w-[850px] lg:min-w-[1150px] pl-5 pr-5 bg-white text-black'
            placeholder='Enter content here...'
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            rows={15}
        >
        </textarea>
    </div>
    </div>
  )
}

export default Home
