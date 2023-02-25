import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function TournamentsPanel() {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='w-full flex justify-end'>
        <select name="type" id="type" className='px-4 py-2 bg-slate-800 text-white outline-none'>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="past">Past</option>
        </select>
      </div>

      <div className='w-full h-[1px] bg-slate-800/80'></div>

      <button className='w-full border-2 border-slate-800 border-dashed rounded-md p-4 flex gap-2'>
        <div className='w-12 h-12 rounded-full bg-cornellred flex justify-center items-center'>
          <AiOutlinePlus className='text-white'/>
        </div>
        <div className='flex flex-col items-start'>
          <p className='text-white font-semibold'> Create Tournament </p>
          <p className='text-white text-sm'> Create a tournament for your community </p>
        </div>
      </button>

    </div>
  )
}
