"use client"
import React, { useEffect, useState } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'
import { useTripDetail } from '../provider'
import GlobalMap from './_components/GlobalMap'
import { Button } from '@/components/ui/button'
import { Globe2, Plane } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const CreateNewTrip = () => {
  //@ts-ignore
  const {tripDetailInfo, setTripDetailInfo} = useTripDetail();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setTripDetailInfo(null);
  },[])


  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
        <div>
            <ChatBox />
        </div>
        <div className='col-span-2 relative'>
          {activeIndex === 0 ? <Itinerary /> : <GlobalMap />}

           <Tooltip>
            <TooltipTrigger className='absolute hover:bg-gray-700 bottom-20 left-[75%] rounded '>
             <Button size={'lg'} 
              className='hover:bg-gray-700'
          onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
          > {activeIndex === 0 ? <Plane /> : <Globe2 />}
          </Button>
          </TooltipTrigger>
            <TooltipContent>
              Switch between trip and map view
            </TooltipContent>
          </Tooltip>
          
        </div>
    </div>
  )
}

export default CreateNewTrip