import { Button } from '@/components/ui/button'
import React from 'react'
import { Hero } from './_components/Hero';
import { PopularCityList } from './_components/PopularCityList';

const Home = () => {
  return (
    <div>
      <Hero />
      <PopularCityList />
    </div>
  );
}

export default Home