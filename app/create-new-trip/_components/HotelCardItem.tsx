"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Hotel } from './ChatBox';
import { Button } from '@/components/ui/button';

import { ExternalLink, Star, Wallet } from 'lucide-react';
import axios from 'axios';


type Props={
    hotel: Hotel
}

const HotelCardItem = ({hotel}:Props ) => {
  const [photoUrl,setPhotoUrl] = useState<string>();

  useEffect(() => {
    hotel && GetGooglePlaceDetail();
  }, [hotel]);

  const GetGooglePlaceDetail = async () => {
    const response = await axios.post('/api/google-place-detail', {
      placeName: hotel.hotel_name
    });
    if(response?.data?.error){
      return;
    }
    // return response.data;
    setPhotoUrl(response?.data);
  }

  return (
    <div  className='flex flex-col gap-2'>
              <Image src={photoUrl?photoUrl:'/trvel.svg'} 
              alt='place-image' 
              width={400} height={200}  className='rounded-xl shadow object-cover mb-2'/>
              <h1 className='font-semibold text-lg'>{hotel.hotel_name}</h1>
              <h2 className='text-gray-500'>{hotel.hotel_address}</h2>


              <div className='flex justify-between items-center'>
                  <p className='flex gap-2 text-green-600 '><Wallet  /> {hotel.price_per_night}</p>
                  <p className='text-yellow-500 flex gap-2'> <Star/>{hotel.rating}</p>
              </div>
              {/* <p className='line-clamp-2 text-gray-500 pb-2'>{hotel?.description}</p> */}
              <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full mt-2" size="sm">
                      View <ExternalLink className="ml-1" />
                    </Button>
                  </a>
              {/* <Button variant={'outline'} className='mt-1'>View Details</Button> */}
              
            </div>
  )
}

export default HotelCardItem







