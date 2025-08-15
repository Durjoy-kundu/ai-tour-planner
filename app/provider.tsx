"use client";
import React, { useEffect, useState, useContext } from 'react'
import Header from './_components/Header';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import {useUser} from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';

  const provider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const CreateUser = useMutation(api.user.CreateNewUser);
    const {userDetail, setUserDetail} = useState<any>();
    const {user} = useUser();

    useEffect(() => {
      user && CreateNewUser();
    },[user])

    const CreateNewUser = async () => {
      // Save new user if not exists
      if(user){
      const result = await CreateUser({
          email: user?.primaryEmailAddress?.emailAddress??'',
          imageUrl: user?.imageUrl,
          name: user?.fullName??'',
      });
      setUserDetail(result);
     }
    }
    return (

      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>

      
      <div>
          <Header />
          {children}
          
      </div>
      </UserDetailContext.Provider>
    )
  }

  export default provider
  export const useUserDetail = () => {
    return useContext(UserDetailContext);
  }