
"use client"
import React, { useEffect } from 'react'
import { Button} from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {Loader, Send} from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import EmptyBoxState from './EmptyBoxState';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
import FinalUi from './FinalUi';
import SelectDaysUi from './SelectDaysUi';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useUserDetail } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';


type Message = {
    role:string,
    content:string,
    ui?: string,
}

 export type TripInfo = {
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    origin: string,
    hotels: any,
    itinerary: any

}

const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [isFinal, setIsFinal] = useState(false);
    const [tripDetails, setTripDetails] = useState<TripInfo>();
    const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
    const {userDetail, setUserDetail} = useUserDetail();


    const onSend = async() => {
        // Handle send message logic
        console.log("IInside onSend");
        if (!userInput.trim()) return; // Prevent sending empty messages
        setLoading(true);
        

 
        const newMsg:Message={
            role:'user',
            content:userInput ?? ''
        }

        setUserInput('');
        console.log("HERE")

        setMessages((prev:Message[]) => [...prev, newMsg]);

        const result = await axios.post('/api/aimodel',{
            messages:[...messages, newMsg],
            isFinal: isFinal
        })

        console.log("Trip", result.data);



        !isFinal && setMessages((prev:Message[]) => [...prev,{
            role:'assistant',
            content: result?.data?.resp,
            ui: result?.data?.ui
        }]);

        if(isFinal) {
            setTripDetails(result?.data?.trip_plan);
            const tripId = uuidv4();
           await SaveTripDetail({
                tripDetail: result?.data?.trip_plan,
                tripId: tripId,
                uid:userDetail?._id ,
            });
        }

        console.log(result.data);
        setLoading(false);
    }

    // onsend from ai
    //  const onSend = async () => {
    //     if (!userInput.trim()) return;
    //     setLoading(true);

    //     try {
    //         const newMsg: Message = {
    //             role: 'user',
    //             content: userInput
    //         };

    //         setMessages(prev => [...prev, newMsg]);
    //         setUserInput('');

    //         const result = await axios.post('/api/aimodel', {
    //             messages: [...messages, newMsg],
    //             isFinal: isFinal
    //         });

    //         if (result.data) {
    //             setMessages(prev => [...prev, {
    //                 role: 'assistant',
    //                 content: result.data.resp,
    //                 ui: result.data.ui
    //             }]);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const RenderGenerativeUi = (ui:string) => {
        // Only render UI components for the latest assistant message
        // if (!isLatestMessage) return null;
        
        if(ui=='budget'){
             return <BudgetUi onSelectedOption = {(value:string) => {
                setUserInput(value); 
                setTimeout(() => onSend(), 100);
             }} />
        } 

        else if(ui == 'groupSize'){
            return <GroupSizeUi onSelectedOption = {(value:string) => {
                setUserInput(value); 
                setTimeout(() => onSend(), 100);
            }} />
        } 
        
        else if(ui == 'tripDuration' || ui == 'TripDuration'){
            return <SelectDaysUi onSelectedOption = {(value:string) => {
                setUserInput(value); 
                setTimeout(() => onSend(), 100);
            }} />
        }
        else if(ui == 'final'){
            return <FinalUi viewTrip={() => console.log('View trip clicked')} 
            disable={!tripDetails}
            />
        }
        return null;
    }

    useEffect(()=>{
        const lastMsg = messages[messages.length - 1];
        if(lastMsg?.ui == 'final' && !isFinal){
            setIsFinal(true);
            setUserInput('Generate my trip plan');
            setTimeout(() => onSend(), 500);
        }
    },[messages, isFinal])

  return (
    <div className='h-[85vh] flex flex-col'>
        {messages?.length === 0 && <EmptyBoxState onSelectedOption={(v:string) => {setUserInput(v); onSend()}} />}
        {/* Display messages */}
        <section className='flex-1 overflow-y-auto p-4'>
            {messages.map((msg:Message, index) =>(
                msg.role === 'user' ? 
                <div className='flex justify-end mt-2' key={index}>
                <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                   {msg.content}
                </div>
            </div> : 

             <div className='flex justify-start mt-2'key={index}>
                <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                    {msg.content}
                    {/* {RenderGenerativeUi(msg.ui ?? '', index === messages.length - 1)} */}
                    {RenderGenerativeUi(msg.ui ?? '')}
                </div>
            </div>
            ))}

            {loading && <div className='flex justify-start mt-2'>
                <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                    <Loader className='animate-spin h-5 w-5 text-gray-500' />
                </div>
            </div>}

        </section>

        {/* User input */}
        <section>
            
            <div className='border rounded-2xl p-4 relative'>
                <Textarea placeholder='Type your message here...' 
                className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none' onChange={(e) => setUserInput(e.target.value)}
                 value={userInput} />
                <Button size={'icon'} className='absolute bottom-6 right-6 cursor-pointer bg-primary text-white hover:bg-primary/90'
                 onClick={()=> onSend()}
                 
                 >
                    <Send className='h-4 w-4'/>
                </Button>
        </div>
        </section>
    </div>
  )
}

export default ChatBox
