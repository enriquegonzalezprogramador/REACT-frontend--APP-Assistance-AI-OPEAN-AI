import React from 'react'

interface Props {

    text: string;
}

export const MyMessage = ({ text }: Props) => {
  return (
    <div className='col-start-6 col-end-13 rounded-lg'>
        <div className='flex  items-center justify-start flex-row-reverse'>
            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
                G
            </div>
            <div className='relative ml-3 text-sm bg-indigo-700  py-2 px-4 rounded-xl'>
                <div>{text}</div>
            </div>
        </div>
    </div>
  )
}