"use client"
import { Button } from '@/components/ui/button';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useUserDetail } from '../provider';
import { api } from '@/convex/_generated/api';
import { TripInfo } from '../create-new-trip/_components/ChatBox';
import { ArrowBigRight } from 'lucide-react';
import Image from 'next/image';

type Trip= {
    tripId: any,
    tripDetail: TripInfo,
    _id: string

}

const MyTrips = () => {
    const [myTrips, setMyTrips] = useState<Trip[]>([]); // Placeholder for trips data
    const {userDetail,setUserDetail} = useUserDetail();
    const  convex = useConvex();
    useEffect(()=>{
        userDetail && GetUserTrip();
    },[userDetail])

    const GetUserTrip=async()=>{
        const result = await convex.query(api.tripDetail.GetUserTrips,{
            uid:userDetail?._id
        });
        setMyTrips(result);
        console.log(result);
    }
  return (
    <div className='px-10 p-10 md:px-24 lg:px-48'>
        <h2 className='font-bold text-3xl'>My Trips</h2>
        {
            myTrips.length === 0 && (
            <div className='p-7 border rounded-2xl flex flex-col items-center justify-center gap-5 mt-6'>
                <h2>You don't have any trip plan created</h2>
                <Link href={'/create-new-trip'}>
                    <Button>Create New Trip</Button>
                </Link>
            </div>
        )}
        <div>
            {
                myTrips.map((trip:any, index) => (
                <div key={index}>
                    <Image src={'./trvel.svg'} alt={trip.tripId} width={400} height={400} className='mx-auto'/>
                    <h2 className='flex gap-2 font-semibold text-xl'
                    >{trip?.tripDetail?.origin}<ArrowBigRight/>{trip?.tripDetail?.destination}</h2>
                </div>
            ))}
        </div>

    </div>
  )
}

export default MyTrips