import React from 'react'

export default function ArenaBar({ side = 'left'}) {
  return (
    <div className='top-0 left-0 hidden sm:block bg-secondary w-16 h-full'>
        <div className='flex flex-col items-center justify-start gap-2 p-2'>
            <div className='bg-primary rounded-full h-10 w-10 font-bold flex items-center justify-center text-white'> A </div>
            <div className='bg-secondary rounded-full h-10 w-10 font-bold flex items-center justify-center text-white'> B </div>
            <div className='bg-primary rounded-full h-10 w-10 font-bold flex items-center justify-center text-white'> C </div>
        </div>
    </div>
  )
}