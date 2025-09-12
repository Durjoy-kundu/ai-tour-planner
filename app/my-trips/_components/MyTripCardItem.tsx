import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { Trip } from '../page'
import { ArrowBigRight } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Tsukimi_Rounded } from 'next/font/google'


type Props= {
    trip: Trip
}

const MyTripCardItem = ({trip}: Props) => {
     const [photoUrl,setPhotoUrl] = useState<string>();
        useEffect(() => {
          trip && GetGooglePlaceDetail();
        }, [trip]);

        const GetGooglePlaceDetail = async () => {
            //@ts-ignore
        const placeName =
        trip?.tripDetail?.destination;
        if (!placeName) return;
          const response = await axios.post('/api/google-place-detail', {
            placeName: placeName
          });
          if(response?.data?.error){
            return;
          }
          // return response.data;
          setPhotoUrl(response?.data);
        }
  return (
     <Link href={'/view-trips/' + trip?.tripId} className='p-5 shadow rounded-2xl'>
                    <Image src={photoUrl?photoUrl:'./trvel.svg'} alt={trip.tripId} width={400} height={400} className='rounded-xl object-cover w-full h-[200px] '/>
                    <h2 className='flex gap-2 font-semibold text-xl mt-2 '
                    >{trip?.tripDetail?.origin}<ArrowBigRight/>{trip?.tripDetail?.destination}</h2>
                    <h2 className='mt-1.5 text-green-500'>{trip?.tripDetail?.duration} Trip With {trip?.tripDetail?.budget} Budget </h2>
                </Link>
  )
}

export default MyTripCardItem