
// "use client"
// import React from 'react'
// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { SignInButton, UserButton } from '@clerk/nextjs';
// import { useUser } from '@clerk/nextjs';
// import { usePathname } from 'next/navigation';

// const menuOptions =  [
//   {
//     name:'Home',
//     path:'/'
//   },
//   {
//     name:'Pricing',
//     path:'/pricing'
//   },
//   {
//     name:'Contact Us',
//     path:'/contact-us'
//   }
// ]
// const Header = () => {

//   const {user} = useUser();
//   const path = usePathname();
//   //console.log("Current path:", path);

//   return (
//     <div className='flex justify-between items-center p-4'>
//         {/* logo */}
//         <div className='flex gap-2 items-center'>
//             <Image src={'/logo.svg'} alt="Logo" width={49} height={48}/>
//            <h2 className='font-bold text-2xl'>AI Travel Planner</h2>
//         </div>
        
//         {/*Menu Option*/}
//           <div className='flex gap-5 items-center'>
//             {menuOptions.map((menu, index) =>(
//               <Link key={index} href={menu.path}>
//                 <h2 className='text-lg hover:scale-105 transition hover:text-primary'>{menu.name}</h2>
//               </Link>
//             ))}
//           </div>
//         {/*Get Started Button*/}
//         <div className='flex gap-5 items-center'>
//        {!user? <SignInButton mode="modal">
//           <Button className='cursor-pointer'>Get Started</Button>
//         </SignInButton> : 
//        path == '/create-new-trip'?

//        <Link href={'/my-trips'}>
//           <Button className='cursor-pointer'>My Trips</Button>
//         </Link>

//        : <Link href={'/create-new-trip'}>
//           <Button className='cursor-pointer'>Create New Trip</Button>
//         </Link>
//       }
//       <UserButton />
//       </div>

//     </div>
//   )
// }

// export default Header

"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // for hamburger icons

const menuOptions = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
   { name:'About Us', path:'/#about-us' }
]

const Header = () => {
  const { user } = useUser();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="p-4 shadow-md bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image src={'/logo.svg'} alt="Logo" width={40} height={40} />
          <h2 className="font-bold text-xl sm:text-2xl">AI Travel Planner</h2>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          {menuOptions.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <h2 className="text-lg hover:scale-105 transition hover:text-primary">
                {menu.name}
              </h2>
            </Link>
          ))}
        </nav>

        {/* Right Side Buttons (Desktop) */}
        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <SignInButton mode="modal">
              <Button className="cursor-pointer">Get Started</Button>
            </SignInButton>
          ) : path === '/create-new-trip' ? (
            <Link href={'/my-trips'}>
              <Button className="cursor-pointer">My Trips</Button>
            </Link>
          ) : (
            <Link href={'/create-new-trip'}>
              <Button className="cursor-pointer">Create New Trip</Button>
            </Link>
          )}
          <UserButton />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-gray-50 rounded-lg p-4 shadow">
          {menuOptions.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              onClick={() => setIsOpen(false)}
              className="text-lg hover:text-primary"
            >
              {menu.name}
            </Link>
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            {!user ? (
              <SignInButton mode="modal">
                <Button className="cursor-pointer w-full">Get Started</Button>
              </SignInButton>
            ) : path === '/create-new-trip' ? (
              <Link href={'/my-trips'} onClick={() => setIsOpen(false)}>
                <Button className="cursor-pointer w-full">My Trips</Button>
              </Link>
            ) : (
              <Link href={'/create-new-trip'} onClick={() => setIsOpen(false)}>
                <Button className="cursor-pointer w-full">Create New Trip</Button>
              </Link>
            )}
            <UserButton />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
