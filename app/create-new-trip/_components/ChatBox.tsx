
"use client"
import React from 'react'
import { Button} from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {Send} from 'lucide-react';



const ChatBox = () => {

    const onSend = () => {
        // Handle send message logic
    }

  return (
    <div className='h-[85vh] flex flex-col'>
        {/* Display messagses */}
        <section className='flex-1 overflow-y-auto p-4'>
            <div className='flex justify-end mt-2'>
                <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                    User Msg
                </div>
            </div>

             <div className='flex justify-start mt-2'>
                <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                    AI Agent Message
                </div>
            </div>
        </section>

        {/* User input */}
        <section>
            
            <div className='border rounded-2xl p-4 relative'>
                <Textarea placeholder='Type your message here...' 
                className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none' />
                <Button size={'icon'} className='absolute bottom-6 right-6 cursor-pointer bg-primary text-white hover:bg-primary/90'
                 onClick={()=> onSend()}>
                    <Send className='h-4 w-4'/>
                </Button>
        </div>
        </section>
    </div>
  )
}

export default ChatBox