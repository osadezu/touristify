import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import DestinationPrompt from '../components/DestinationPrompt';
import AttractionsPrompt from '../components/AttractionsPrompt';

const Home: NextPage = () => {
  const [destination, setDestination] = useState<string | null>(null);

  return (
    <div>
      <Head>
        <title>Touristify</title>
        <meta
          name='description'
          content='An AI-based app that recommends activities and attractions at your next destination.'
        />
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>

      <header>
        <h1>Touristify</h1>
      </header>

      <main>
        {!destination ? (
          <DestinationPrompt setDestination={setDestination} />
        ) : (
          <AttractionsPrompt destination={destination} />
        )}
      </main>

      <aside></aside>

      <footer></footer>
    </div>
  );
};

export default Home;
