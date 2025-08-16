// import {NextRequest} from "next/server";
// import OpenAI from 'openai';
// import { NextResponse } from "next/server";
// export const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: process.env.OPENROUTER_API_KEY,
  
// });
// const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

//  Only ask questions about the following details in order, and wait for the user’s answer before asking the next: 

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
// Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/TripDuration/Final) , where Final means AI generating complete final outpur
// Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text) with following JSON schema:
// {
// resp:'Text Resp',
// ui:'budget/groupSize/TripDuration/Final)'
// }
// `

// export async function POST(request: NextRequest) {
//     const { messages } = await request.json();


//     try{
//     const completion = await openai.chat.completions.create({
//     model: 'mistralai/mistral-7b-instruct:free',
//     response_format:{type:'json_object'},
//     messages: [
//         {
//             role: 'system',
//             content: `PROMPT`,
//         },
//         ...messages
//     ],
//   });
//   console.log(completion.choices[0].message);
//   const message=completion.choices[0].message;
//   return NextResponse.json(JSON.parse(message.content??''));
// }
// catch (error) {
//   console.error('Error occurred while processing request:', error);
//   return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
// }
// }
import { NextRequest } from "next/server";
import OpenAI from 'openai';
import { NextResponse } from "next/server";

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'AI Travel Planner'
  }
});

// Modify the PROMPT to emphasize JSON response requirement
const PROMPT = `You  are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time. Only ask questions about the following details in order, and wait for the user’s answer before asking the next:

1. Starting location (source) 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High)
5. Trip duration (number of days) 
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
7. Special requirements or preferences (if any)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/tripDuration/final) , where Final means AI generating complete final outpur
Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text) with following JSON schema:
{
resp:'Text Resp',
ui:'budget/groupSize/tripDuration/final)'
}`

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

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        const completion = await openai.chat.completions.create({
            model: 'mistralai/mistral-7b-instruct',
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: PROMPT,
                },
                ...messages
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const content = completion.choices[0].message.content;

        // Validate JSON response
        try {
            const jsonResponse = JSON.parse(content ?? '{}');
            if (!jsonResponse.resp || !jsonResponse.ui) {
                throw new Error('Invalid response format');
            }
            return NextResponse.json(jsonResponse);
        } catch (parseError) {
            // If JSON parsing fails, return a formatted error response
            return NextResponse.json({
                resp: "I apologize, but I need to respond in a specific format. Let's start over. What's your starting location?",
                ui: "source"
            });
        }
    } catch (error) {
        console.error('Error occurred while processing request:', error);
        return NextResponse.json({ 
            resp: "Sorry, there was an error processing your request. Please try again.",
            ui: "error"
        }, { status: 500 });
    }
}
