import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useRouter } from 'next/router';
import { IoLogOut } from 'react-icons/io5';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';

export default function Home({ auth, accessToken }) {
  const router = useRouter();
  const [user, setUser] = useState({});

  const signout = () => {
    // localStorage.clear();
    // router.push('/login')

    const auth = getAuth(app);
    signOut(auth);
    localStorage.clear();
    router.push('/login');
  };
  useEffect(() => {
    const accessToken = userAccessToken();
    if (!accessToken) return router.push('/login');
    const [userInfo] = fetchUser();
    setUser(userInfo);
  }, []);

  return (
    <div className='bg-red-300 flex items-center justify-center h-screen w-screen '>
      <Head>
        <title>Google Authentication with Firebase</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='w-fit h-auto p-4 bg-white shadow-md justify-start items-center relative rounded-md'>
        <IoLogOut
          fontSize={25}
          className='absolute top-3 right-3 cursor-pointer text-gary-600'
          onClick={signout}
        />
        <div className='flex space-x-4'>
          <img src={user?.photoURL} alt='' className='rounded-full' />
          <div className='flex flex-col justify-center'>
            <h3>{user?.displayName}</h3>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const getServerSideProps = async () => {
  return {
    props: {
      auth,
      accessToken,
    },
  };
};
