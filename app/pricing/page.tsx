import React from 'react'
import {PricingTable} from '@clerk/nextjs'

const Pricing = () => {
  return (
    <div className='mt-20'>
      <h2 className='font-bold text-3xl my-5 text-center'>Pricing Plans</h2>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
      <PricingTable />
    </div>
    </div>
  )

   
}

export default Pricing