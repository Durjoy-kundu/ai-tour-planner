"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

interface SelectDaysUiProps {
    onSelectedOption: (value: string) => void;
}

const SelectDaysUi = ({ onSelectedOption }: SelectDaysUiProps) => {
    const [days, setDays] = useState(1);

    const incrementDays = () => {
        setDays(prev => prev + 1);
    }

    const decrementDays = () => {
        if (days > 1) {
            setDays(prev => prev - 1);
        }
    }

    const handleConfirm = () => {
        onSelectedOption(`I want to travel for ${days} days`);
    }

    return (
        <div className='space-y-4'>
            {/* Gray background message */}
            <div className='bg-gray-100 p-4 rounded-lg'>
                <p className='text-gray-600'>
                    Thanks for sharing! How many days are you planning to spend on this trip?
                </p>
            </div>

            {/* White background selection area */}
            <div className='bg-white p-6 rounded-lg shadow-sm border'>
                <h1 className='text-xl font-semibold mb-6'>
                    How many days do you want to travel?
                </h1>

                {/* Increment/Decrement controls */}
                <div className='flex items-center justify-center gap-6 mb-6'>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementDays}
                        disabled={days <= 1}
                    >
                        <Minus className='h-4 w-4' />
                    </Button>

                    <span className='text-2xl font-bold min-w-[3rem] text-center'>
                        {days}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={incrementDays}
                    >
                        <Plus className='h-4 w-4' />
                    </Button>
                </div>

                {/* Confirm button */}
                <div className='flex justify-center'>
                    <Button 
                        className='bg-primary text-white hover:bg-primary/90 px-8'
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SelectDaysUi