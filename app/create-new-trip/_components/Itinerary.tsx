"use client"
import React, { useEffect } from 'react'
import { Timeline } from "@/components/ui/timeline";
import { ArrowLeft, Clock, ExternalLink, Ticket, Wallet } from 'lucide-react';
import { Star } from 'lucide-react';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import {useTripDetail} from '@/app/provider';
import { useState } from 'react';
import { TripInfo } from './ChatBox';




// const TRIP_DATA = {
//   origin: "Dhaka",
//   destination: "Mumbai",
//   budget: "Cheap",
//   duration: "4 days",
//   group_size: "2",
//   hotels: [
//     {
//       description:
//         "Budget-friendly hotel located close to Mumbai central attractions, offering clean rooms and good services.",
//       geo_coordinates: { latitude: 18.9388, longitude: 72.8301 },
//       hotel_address:
//         "21A, New Marine Lines Lane, Near Azad Maidan, Fort, Mumbai, Maharashtra 400001, India",
//       hotel_image_url:
//         "https://cf.bstatic.com/xdata/images/hotel/square200/70098584.jpg?k=e6fd6f49a1b0e5e7778f2aaef523cdb83eb7c49cb3ea44dd0d26c72651c756d6&o=",
//       hotel_name: "Hotel Residency Fort",
//       price_per_night: "$25",
//       rating: 7.5
//     },
//     {
//       description:
//         "Affordable hotel with comfortable rooms, centrally located near CST station making it easy to explore the city.",
//       geo_coordinates: { latitude: 18.9385, longitude: 72.8303 },
//       hotel_address:
//         "57/59, Rani Baug, Fort, Mumbai, Maharashtra 400001, India",
//       hotel_image_url:
//         "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/7c/a3/fd/hotel-godwin.jpg?w=1200&h=-1&s=1",
//       hotel_name: "Hotel Godwin",
//       price_per_night: "$20",
//       rating: 7.1
//     },
//     {
//       description:
//         "Economical hotel near Gateway of India with basic amenities and easy access to major Mumbai tourist spots.",
//       geo_coordinates: { latitude: 18.9383, longitude: 72.8307 },
//       hotel_address:
//         "56/A, Rani Baug, Near Gateway of India, Fort, Mumbai, Maharashtra 400001, India",
//       hotel_image_url:
//         "https://q-xx.bstatic.com/xdata/images/hotel/square200/99193226.jpg?k=4f518ad6ddd71a6ddabce9613a6088b9b152151614e312c474c7ee1be84e1842&o=",
//       hotel_name: "Hotel Sai Palace",
//       price_per_night: "$22",
//       rating: 7.3
//     }
//   ],
//   itinerary: [
//     {
//       "day": 1,
//       "day_plan": "Arrival on mumbai, explore",
//       "best_time_to_visit": "Early morning to avoid crowds",
//       activities: [
//         {
//         best_time_to_visit: "Early morning to avoid crowds",
//         geo_coordinates: { latitude: 18.921984, longitude: 72.834654 },
//         place_address: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India",
//         place_details:
//           "An iconic symbol of Mumbai, built during the British Raj, overlooking the Arabian Sea.",
//         place_image_url:
//           "https://upload.wikimedia.org/wikipedia/commons/7/7d/Gateway_of_India_in_Mumbai_03-2016_img3.jpg",
//         place_name: "Gateway of India",
//         ticket_pricing: "Free",
//         time_travel_each_location: "1 hour"
//       },
//       {
//         best_time_to_visit: "Late morning",
//         geo_coordinates: { latitude: 18.9402, longitude: 72.8352 },
//         place_address: "Fort, Mumbai, Maharashtra 400001, India",
//         place_details:
//           "A UNESCO World Heritage Site and historic railway station known for Victorian Gothic architecture.",
//         place_image_url:
//           "https://upload.wikimedia.org/wikipedia/commons/b/b3/Chhatrapati_Shivaji_Terminus_Mumbai01.jpg",
//         place_name: "Chhatrapati Shivaji Maharaj Terminus (CST)",
//         ticket_pricing: "Free",
//         time_travel_each_location: "30 minutes"
//       },
//       {
//         best_time_to_visit: "Afternoon",
//         geo_coordinates: { latitude: 18.9216, longitude: 72.8311 },
//         place_address: "Colaba, Mumbai, Maharashtra 400005, India",
//         place_details:
//           "A vibrant street market famous for shopping, souvenirs, and street food.",
//         place_image_url:
//           "https://www.mumbailive.com/imagegallery/1055/colaba-causeway-market-shopping-mumbai-india_1.jpg",
//         place_name: "Colaba Causeway Market",
//         ticket_pricing: "Free entry, shopping costs vary",
//         time_travel_each_location: "2 hours"
//       }
//     ]
//   }
// ]
// }

const Itinerary = () => {
  //@ts-ignore
  const {tripDetailInfo, setTripDetailInfo} = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo);
  }, [tripDetailInfo]);


  const data = tripData? [
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData?.hotels.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      ),
    },
    
    ...tripData?.itinerary.map((dayData) => ({
          title: `Day ${dayData?.day}`,
          content:(
            <div>
              <p>Best Time: {dayData?.best_time_to_visit}</p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
             {/*@ts-ignore */}
              {dayData?.activities.map((activity, idx) => (
                  <PlaceCardItem  activity={activity} />
              ))}
            </div>
            </div>
          )
    }))
   
  ]: [];
  return (
    <div className="relative w-full h-[83vh] overflow-y-auto ">
      {/*@ts-ignore */}
      {tripData ? <Timeline data={data} tripData={tripData} />
       :
       <div>

        <h2 className='flex gap-2 text-3xl text-white left-20 items-center absolute bottom-17'>
          <ArrowLeft/>
          Getting to know you to build your perfect trip...
        </h2>

       <Image src={'/trip.jpg'}  alt='travel' width={800} height={800}
       className='w-full h-full object-cover rounded-3xl'
       />
        
        </div>
    }
    </div>
  );
}

export default Itinerary
