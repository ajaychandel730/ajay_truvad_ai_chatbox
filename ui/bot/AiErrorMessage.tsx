"use client";
import React from 'react'
import { BotErrorMessage } from './typescript/interfaces'

type Props = {
  message:BotErrorMessage;
}

const AiErrorMessage = ({message}:Props) => {
  return (
    <div className='flex w-fit items-center rounded-full  p-2 shadow shadow-gray-400'>
       <p className='text-xs flex-wrap text-gray-700 font-medium'>
          {message.text}
       </p>
    </div>
  )
}

export default AiErrorMessage