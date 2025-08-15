import React from 'react'
import ChatBox from './_components/ChatBox'

const CreateNewTrip = () => {
  return (
    <div className='grid grid-cols-1 gap-5 p-10'>
        <div>
            <ChatBox />
        </div>
        <div>
            Map to trip plan to Display
        </div>
    </div>
  )
}

export default CreateNewTrip