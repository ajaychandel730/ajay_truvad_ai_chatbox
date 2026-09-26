import React from 'react'
import { BotErrorMessage } from './typescript/interfaces'

type Props = {
  message:BotErrorMessage;
}

const AiErrorMessage = ({message}:Props) => {
  return (
    <div className='flex w-full items-center rounded-full bg-red-400 shadow shadow-gray-400'>
       <p className='text-xs flex-wrap'>
          {message.text}
       </p>
    </div>
  )
}

export default AiErrorMessage