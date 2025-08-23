import React from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'

const CreateNewTrip = () => {
  return (
    <div className='grid grid-cols-1 gap-5 p-10'>
        <div>
            <ChatBox />
        </div>
        <div>
            <Itinerary />
        </div>
    </div>
  )
}

export default CreateNewTrip