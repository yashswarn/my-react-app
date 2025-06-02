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
    <div className='flex flex-row gap-12'>
        <input
            className='border border-gray-300 pl-5 pr-5 rounded min-w-[1011px] bg-white text-black'
            type='text'
            placeholder='Enter title here'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
        />

        <button onClick={createPaste} className='rounded bg-blue-600 text-1xl'>
        {
            pasteId?"Update My Paste":"Create My Paste"
        }
        </button>   
    </div>
    <div className='mt-8'>
        <textarea
            className='pt-3 border border-gray-300 rounded min-w-[1215px] pl-5 pr-5 bg-white text-black'
            placeholder='Enter content here...'
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            rows={17}
        >
        </textarea>
    </div>
    </div>
  )
}

export default Home
