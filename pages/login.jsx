import React from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import { async } from '@firebase/util';
import { useRouter } from 'next/router';
const login = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const signIn = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;

    localStorage.setItem('user', JSON.stringify(providerData));
    localStorage.setItem('accessToken', JSON.stringify(refreshToken));
    router.push('/');
  };
  return (
    <div className='relative flex items-center justify-center h-screen w-screen'>
      <Image
        className='absolute top-0 left-0 h-screen w-screen '
        src='/bg-img.jpg'
        layout='fill'
        objectFit='cover'
      />
      <div
        className='flex space-x-4 p-2 border rounded-lg border-blue-400
            z-10 bg-opacity-80 bg-white hover:shadow-md hover:bg-opacity-100 
            transition ease-out '
        onClick={signIn}
      >
        <FcGoogle fontSize={30} />
        <p className='text-lg font-semibold'>Sign In with Google</p>
      </div>
    </div>
  );
};

export default login;
