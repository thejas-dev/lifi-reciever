import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header';
import Main from '../components/Main';
import Watch from '../components/Watch';
import About from '../components/About';
import {useState} from 'react';

export default function Index () {
  const [page,setPage] = useState('Home');

  return (
    <div className="min-h-screen bg-gray-900 w-full">
      <Head>
        <title>LIFI DATA TRANSFER</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full ">
        <Header setPage={setPage} page={page} />            
        {
          page === 'Home'?
            <Main/>
          :
          page === 'Watch'?
            <Watch/>
          :
          page === 'About'?
            <About/>
          :
          <></>
        }
      </main>

      
    </div>
  )
}


