'use client'
import { ConnectFour } from '@/components/ConnectFour';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Connect Four</title>
      </Head>
      <main style={{ padding: '20px' }}>
        <ConnectFour />
      </main>
    </>
  );
};

export default Home;