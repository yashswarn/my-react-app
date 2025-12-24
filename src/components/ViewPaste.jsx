import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {
  const {id}=useParams();

  const allPastes=useSelector((state)=>state.paste.pastes);

  const paste=allPastes.filter((p)=>p._id===id)[0];
  console.log("final paste",paste);

 return (
    <div>
    <div className='flex flex-row gap-12'>
        <input
            className='sm:min-w-[700px] md:min-w-[970px] lg:min-w-[1150px]  border border-gray-300 px-5 py-2 rounded min-w-[360px] bg-white text-gray-400'
            type='text'
            placeholder='Enter title here'
            value={paste.title}
            onChange={(e)=>setTitle(e.target.value)}
        />
   
    </div>
    <div className='mt-8'>
        <textarea
            className='sm:min-w-[700px] md:min-w-[970px] lg:min-w-[1150px] border text-gray-400 border-gray-300 rounded min-w-[360px] pl-5 pr-5 bg-white '
            placeholder='Enter content here...'
            value={paste.content}
            onChange={(e)=>setValue(e.target.value)}
            rows={15}
        >
        </textarea>
    </div>
    </div>
  )
}

export default ViewPaste
