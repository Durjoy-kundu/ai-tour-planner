import React, { useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useRef } from 'react';

    const GlobalMap = () => {

    const mapContainerRef = useRef(null);
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
        const map = new mapboxgl.Map({
        container: mapContainerRef?.current??'', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 1.7, // starting zoom
        projection: 'globe' // display the map as a 3D globe

    });

    }, [])


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
       
