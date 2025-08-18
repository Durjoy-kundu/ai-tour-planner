import {NextRequest} from "next/server";
import OpenAI from 'openai';
import { NextResponse } from "next/server";
export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  
});
const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

Only ask questions about the following details in order, and wait for the user's answer before asking the next: 

1. Starting location (source) 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High) 
5. Trip duration (number of days) 
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
7. Special requirements or preferences (if any)

IMPORTANT RULES:
- Do not ask multiple questions at once, and never ask irrelevant questions.
- If any answer is missing or unclear, politely ask the user to clarify before proceeding.
- Always maintain a conversational, interactive style while asking questions.
- Once a user has answered a question (like selecting days), acknowledge their answer and move to the next question WITHOUT showing the same UI component again.
- Only show UI components when asking a NEW question, not when acknowledging answers.
- After collecting ALL 7 pieces of information (source, destination, group size, budget, duration, interests, special requirements), use "final" UI to generate the trip plan.

UI Component Guidelines:
- Use 'groupSize' ONLY when first asking about group size
- Use 'budget' ONLY when first asking about budget  
- Use 'TripDuration' ONLY when first asking about trip duration (number of days)
- Use 'final' when generating the complete final output
- Use empty string ("") when acknowledging answers or asking follow-up text questions
- NEVER repeat the same UI component after the user has already answered that question

Always return a **strict JSON response only** (no explanations or extra text) with following JSON schema:
{
"resp": "Your response text here",
"ui": "groupSize/budget/TripDuration/final or empty string"
}
`




// Modify the PROMPT to emphasize JSON response requirement
// const PROMPT = `You  are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time. Only ask questions about the following details in order, and wait for the user’s answer before asking the next:

// 1. Starting location (source) 
// 2. Destination city or country 
// 3. Group size (Solo, Couple, Family, Friends) 
// 4. Budget (Low, Medium, High)
// 5. Trip duration (number of days) 
// 6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
// 7. Special requirements or preferences (if any)
// Do not ask multiple questions at once, and never ask irrelevant questions.
// If any answer is missing or unclear, politely ask the user to clarify before proceeding.
// Always maintain a conversational, interactive style while asking questions.
// Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/tripDuration/final) , where Final means AI generating complete final outpur
// Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text) with following JSON schema:
// {
// resp:'Text Resp',
// ui:'budget/groupSize/tripDuration/final)'
// }
// `

const FINAL_PROMPT = `Generate Travel Plan with give details, give me Hotels options list with HotelName,

Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url,

 Geo Coordinates,Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.

 Output Schema:

 {

  "trip_plan": {

    "destination": "string",

    "duration": "string",

    "origin": "string",

    "budget": "string",

    "group_size": "string",

    "hotels": [

      {

        "hotel_name": "string",

        "hotel_address": "string",

        "price_per_night": "string",

        "hotel_image_url": "string",

        "geo_coordinates": {

          "latitude": "number",

          "longitude": "number"

        },

        "rating": "number",

        "description": "string"

      }

    ],

    "itinerary": [

      {

        "day": "number",

        "day_plan": "string",

        "best_time_to_visit_day": "string",

        "activities": [

          {

            "place_name": "string",

            "place_details": "string",

            "place_image_url": "string",

            "geo_coordinates": {

              "latitude": "number",

              "longitude": "number"

            },

            "place_address": "string",

            "ticket_pricing": "string",

            "time_travel_each_location": "string",

            "best_time_to_visit": "string"

          }

        ]

      }

    ]

  }

}

`
export async function POST(request: NextRequest) {
    const { messages , isFinal } = await request.json();


    try{
    const completion = await openai.chat.completions.create({
    model: 'openai/gpt-4.1-mini',
    response_format:{type:'json_object'},
    messages: [
        {
            role: 'system',
            content: isFinal ? FINAL_PROMPT : PROMPT,
        },
        ...messages
    ],
  });
  console.log(completion.choices[0].message);
  const message=completion.choices[0].message;
  
  try {
    const parsedContent = JSON.parse(message.content ?? '{}');
    return NextResponse.json(parsedContent);
  } catch (parseError) {
    console.error('JSON parsing error:', parseError);
    console.error('Raw content:', message.content);
    // Return a fallback response if JSON parsing fails
    return NextResponse.json({
      resp: "I apologize, but there was an issue processing your request. Please try again.",
      ui: ""
    });
  }
}
catch (error) {
  console.error('Error occurred while processing request:', error);
  return NextResponse.json({ 
    resp: "Sorry, there was an error processing your request. Please try again.",
    ui: ""
  }, { status: 500 });
}
}
// import { NextRequest } from "next/server";
// import OpenAI from 'openai';
// import { NextResponse } from "next/server";

// export const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: process.env.OPENROUTER_API_KEY,
//   defaultHeaders: {
//     'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
//     'X-Title': 'AI Travel Planner'
//   }
// });

// export async function POST(request: NextRequest) {
//     try {
//         const { messages, isFinal } = await request.json();

//         const completion = await openai.chat.completions.create({
//             model: 'openai/gpt-4.1-mini',
//             response_format: { type: 'json_object' },
//             messages: [
//                 {
//                     role: 'system',
//                     content: isFinal ? FINAL_PROMPT : PROMPT
//                 },
//                 ...messages
//             ],
//             temperature: 0.7,
//             max_tokens: 2000,
//         });

//         const content = completion.choices[0].message.content;

//         // Validate JSON response
//         try {
//             const jsonResponse = JSON.parse(content ?? '{}');
//             if (!jsonResponse.resp || !jsonResponse.ui) {
//                 throw new Error('Invalid response format');
//             }
//             return NextResponse.json(jsonResponse);
//         } catch (parseError) {
//             // If JSON parsing fails, return a formatted error response
//             return NextResponse.json({
//                 resp: "I apologize, but I need to respond in a specific format. Let's start over. What's your starting location?",
//                 ui: "source"
//             });
//         }
//     } catch (error) {
//         console.error('Error occurred while processing request:', error);
//         return NextResponse.json({ 
//             resp: "Sorry, there was an error processing your request. Please try again.",
//             ui: "error"
//         }, { status: 500 });
//     }
// }



// You must ALWAYS respond in valid JSON format using this exact schema:
// {
//   "resp": "your response text here",
//   "ui": "source"
// }

// Your goal is to help plan trips by asking ONE question at a time about:
// 1. Starting location (source) - ui:"source"
// 2. Destination (city/country) - ui:"destination"
// 3. Group size - ui:"groupSize"
// 4. Budget level - ui:"budget"
// 5. Trip duration - ui:"tripDuration"
// 6. Travel interests - ui:"interests"
// 7. Special requirements - ui:"requirements"
// 8. Final plan - ui:"final"

// Ask questions in order, one at a time. Wait for each answer before proceeding.
// IMPORTANT: Always return valid JSON with "resp" and "ui" fields.`;
