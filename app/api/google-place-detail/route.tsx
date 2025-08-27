import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function POST(req:NextRequest) {

  const {placeName} = await req.json();  
  const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';
  
  const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-key': process?.env?.GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
  };

  try{
    const result = await axios.post(BASE_URL, {
        textQuery: placeName
    },
        config);

    const placeRefName = result?.data?.places[0]?.photos[0]?.name;
    const PhotoRefUrl = `https://places.googleapis.com/v1/${placeRefName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process?.env?.GOOGLE_PLACE_API_KEY}`

    return NextResponse.json(PhotoRefUrl);

}

catch (error) {
    console.error('Error fetching place details:', error);
    return NextResponse.json({ error: 'Failed to fetch place details' }, { status: 500 });
}
}