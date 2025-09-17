import { Button } from '@/components/ui/button'
import React from 'react'
import { Hero } from './_components/Hero';
import { PopularCityList } from './_components/PopularCityList';
import { AboutUs, Footer } from './_components/AboutUs';


const Home = () => {
  return (
    <div>
      <Hero />
      <PopularCityList />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default Home