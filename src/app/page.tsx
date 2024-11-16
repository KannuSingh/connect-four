'use client'
import Head from 'next/head';
import ConnectFour from '../components/ui/ConnectFour/ConnectFour';

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