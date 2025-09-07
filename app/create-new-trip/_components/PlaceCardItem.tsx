"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { ExternalLink, Ticket, Clock } from 'lucide-react';
import { Activity } from './ChatBox';

type Props= {
    activity: Activity;
}


const PlaceCardItem = ({activity}: Props) => {
    const [photoUrl,setPhotoUrl] = useState<string>();
    useEffect(() => {
      activity && GetGooglePlaceDetail();
    }, [activity]);

    const GetGooglePlaceDetail = async () => {
      const response = await axios.post('/api/google-place-detail', {
        placeName: activity.place_name + ":" + activity?.place_address
      });
      if(response?.data?.error){
        return;
      }
      // return response.data;
      setPhotoUrl(response?.data);
    }
  return (
    <div  className='border-b border-gray-200 py-2'>
                  <Image 
                  src={photoUrl?photoUrl:'/trvel.svg'} 
                  alt={activity.place_name}
                  width={400} height={200} 
                  className='rounded-xl shadow object-cover mb-2'/>

                  <h3 className='font-semibold text-lg'>{activity.place_name}</h3>
                  <p className='text-gray-500'>{activity.place_details}</p>
                  <h2 className='flex gap-2 text-green-500 line-clamp-1'><Ticket />{activity?.ticket_pricing}</h2>
                  {/* <p className='flex text-orange-400 gap-2'><Clock/>{activity?.time_travel_each_location}</p> */}
                  <p className='flex text-orange-500 gap-2'><Clock/> Best Time: {activity?.best_time_to_visit}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity?.place_name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full mt-2" size="sm">
                      View <ExternalLink className="ml-1" />
                    </Button>
                  </a>

               {/* <Link href={'www.google.com/maps/search/?api=1&query=' + activity?.place_name} >
                  <Button variant={'outline'} className=' w-full mt-2' size={'sm'}>View <ExternalLink /></Button>
               </Link> */}

                </div>
  )
}

export default PlaceCardItem