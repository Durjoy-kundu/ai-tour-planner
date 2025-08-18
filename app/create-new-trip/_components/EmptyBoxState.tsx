// import React from 'react'
// import { Globe2, Plane, Landmark } from 'lucide-react'

// // Define suggestions locally to avoid import issues
// const suggestions = [
//     {
//         title: 'Create New Trip',
//         icon: <Globe2 className='text-blue-400 h-5 w-5'/>
//     },
//     {
//         title: 'Inspire me where to go',
//         icon: <Plane className='text-green-500 h-5 w-5'/>
//     },
//     {
//         title: 'Discover Hidden gems',
//         icon: <Landmark className='text-cyan-500 h-5 w-5'/>
//     }
// ]
// const EmptyBoxState = ({ onSelectOption }:any) => {
//   return (
//     <div className='mt-7'>
//         <h2 className='font-bold text-3xl text-center'>Start Planning new <strong className='text-primary'>trip </strong>using AI</h2>
//         <p className='text-muted-foreground text-center mt-2 '>Ask me anything about your trip, I will help you plan it.</p>

//         <div className='flex flex-col gap-5 mt-5'>
//             {suggestions.map((suggestion, index) => (
//                 <div key={index}
//                 onClick={() => onSelectOption(suggestion.title)}
//                 className='flex items-center gap-2 border rounded-full p-3 cursor-pointer hover:border-primary hover:text-primary transition-colors'>
//                     {suggestion.icon}
//                     <h2 className='text-lg'>{suggestion.title}</h2>
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default EmptyBoxState

import React from 'react'
import { Globe2, Plane, Landmark } from 'lucide-react'

// Define the props interface
interface EmptyBoxStateProps {
    onSelectedOption: (value: string) => void;
}

// Define suggestions locally to avoid import issues
const suggestions = [
    {
        title: 'Create New Trip',
        icon: <Globe2 className='text-blue-400 h-5 w-5'/>
    },
    {
        title: 'Inspire me where to go',
        icon: <Plane className='text-green-500 h-5 w-5'/>
    },
    {
        title: 'Discover Hidden gems',
        icon: <Landmark className='text-cyan-500 h-5 w-5'/>
    }
]

const EmptyBoxState = ({ onSelectedOption }: EmptyBoxStateProps) => {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-3xl text-center'>Start Planning new <strong className='text-primary'>trip </strong>using AI</h2>
        <p className='text-muted-foreground text-center mt-2'>Ask me anything about your trip, I will help you plan it.</p>

        <div className='flex flex-col gap-5 mt-5'>
            {suggestions.map((suggestion, index) => (
                <div key={index}
                onClick={() => onSelectedOption(suggestion.title)}
                className='flex items-center gap-2 border rounded-full p-3 cursor-pointer hover:border-primary hover:text-primary transition-colors'>
                    {suggestion.icon}
                    <h2 className='text-lg'>{suggestion.title}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EmptyBoxState