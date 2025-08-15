
"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

const menuOptions =  [
  {
    name:'Home',
    path:'/'
  },
  {
    name:'Pricing',
    path:'/pricing'
  },
  {
    name:'Contact Us',
    path:'/contact-us'
  }
]
const Header = () => {

  const {user} = useUser();
  return (
    <div className='flex justify-between items-center p-4'>
        {/* logo */}
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt="Logo" width={49} height={48}/>
           <h2 className='font-bold text-2xl'>AI Travel Planner</h2>
        </div>
        
        {/*Menu Option*/}
          <div className='flex gap-5 items-center'>
            {menuOptions.map((menu, index) =>(
              <Link key={index} href={menu.path}>
                <h2 className='text-lg hover:scale-105 transition hover:text-primary'>{menu.name}</h2>
              </Link>
            ))}
          </div>
        {/*Get Started Button*/}
       {!user? <SignInButton mode="modal">
          <Button className='cursor-pointer'>Get Started</Button>
        </SignInButton> : 
        <Link href={'/create-new-trip'}>
          <Button className='cursor-pointer'>Create New Trip</Button>
        </Link>
      }

    </div>
  )
}

export default Header