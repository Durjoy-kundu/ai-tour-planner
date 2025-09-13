import React, { useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useRef } from 'react';
import { Activity, Itinerary } from './ChatBox';
import { useTripDetail } from '@/app/provider';

    const GlobalMap = () => {

    const mapContainerRef = useRef(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

      //@ts-ignore
        const {tripDetailInfo, setTripDetailInfo} = useTripDetail();
    
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
        // Initialize map
        if(!mapRef.current){
        mapRef.current = new mapboxgl.Map({
        container: mapContainerRef?.current!, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 1.7, // starting zoom
        projection: 'globe' // display the map as a 3D globe

    });
}

    //Remove existing markers before adding new ones
    const markers: mapboxgl.Marker[] = [];


    if(tripDetailInfo?.itinerary){
        tripDetailInfo?.itinerary.forEach((itinerary: Itinerary) => {
        itinerary.activities.forEach((activity: Activity) => {
            if(activity.geo_coordinates?.longitude && activity.geo_coordinates?.latitude){

                const marker = new mapboxgl.Marker({color:'red'})
                    .setLngLat([activity.geo_coordinates.longitude, activity.geo_coordinates.latitude])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name)// add popups
                    )
                .addTo(mapRef.current!); // add marker to map
                markers.push(marker);
                mapRef.current?.flyTo({
                    center: [activity.geo_coordinates?.longitude, activity.geo_coordinates?.latitude] as [number, number],
                    zoom: 10,
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });
            }

             });
        });
    }

   
    return () => {
        // Clean up on unmount
        markers.forEach(marker => marker.remove());
    }

    }, [tripDetailInfo]);       


  return (
    <div>
        <div ref={mapContainerRef}
        style={{
            width:'95%',
            height:'85vh',
            borderRadius:20
        }}>

        </div>
    </div>
  )
}

export default GlobalMap
       
