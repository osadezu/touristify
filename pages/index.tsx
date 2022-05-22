import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { Attraction } from '../shared/types';
import DestinationPrompt from '../components/DestinationPrompt';
import AttractionsPrompt from '../components/AttractionsPrompt';
import ResultsPrompt from '../components/ResultsPrompt';

const Home: NextPage = () => {
  const [destination, setDestination] = useState<string | null>(null);
  const [baseAttractions, setBaseAttractions] = useState<Attraction[]>([]);
  const [hasPreferences, setHasPreferences] = useState<boolean>(false);

  function doNewDestination() {
    // Add current destination to history
    // And start over
  }

  function renderStage(): JSX.Element {
    if (hasPreferences && destination) {
      return (
        <ResultsPrompt
          destination={destination}
          baseAttractions={baseAttractions}
          doNewDestination={doNewDestination}
        />
      );
    } else if (destination) {
      return (
        <AttractionsPrompt
          destination={destination}
          baseAttractions={baseAttractions}
          setBaseAttractions={setBaseAttractions}
          setHasPreferences={setHasPreferences}
        />
      );
    } else {
      return <DestinationPrompt setDestination={setDestination} />;
    }
  }

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

      <main>{renderStage()}</main>

      <aside></aside>

      <footer></footer>
    </div>
  );
};

export default Home;
