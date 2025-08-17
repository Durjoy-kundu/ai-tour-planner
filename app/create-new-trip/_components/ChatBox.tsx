
"use client"
import React from 'react'
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

type Message = {
    role:string,
    content:string,
    ui?: string,
}

const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const onSend = async() => {
        // Handle send message logic
        if (!userInput.trim()) return; // Prevent sending empty messages
        setUserInput('');
        const newMsg:Message={
            role:'user',
            content:userInput
        }

        setMessages((prev:Message[]) => [...prev, newMsg]);

        const result = await axios.post('/api/aimodel',{
            messages:[...messages, newMsg]
        })

        setMessages((prev:Message[]) => [...prev,{
            role:'assistant',
            content: result?.data?.resp,
            ui: result?.data?.ui
        }]);
        console.log(result.data);
        setLoading(false);
    }

    const RenderGenerativeUi = (ui:string) => {
        if(ui=='budget'){
             return <BudgetUi onSelectedOption = {(value:string) => {setUserInput(value); onSend()}} />
        } 
        else if(ui == 'groupSize'){
            return <GroupSizeUi onSelectedOption = {(value:string) => {setUserInput(value); onSend()}} />
        } else if(ui == 'tripDuration'){
            return <SelectDaysUi onSelectedOption = {(value:string) => {setUserInput(value); onSend()}} />
        } else if(ui == 'final'){
            return <FinalUi viewTrip={() => {}} /> // Assuming viewTrip is a function to view the trip
        }
        return null;
    }

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
