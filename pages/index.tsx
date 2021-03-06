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
  const [results, setResults] = useState<string[] | null>(null);

  function doNewDestination() {
    // Add current destination to history
    // And start over
  }

  function renderStage(): JSX.Element {
    if (hasPreferences && destination) {
      return (
        <ResultsPrompt
          destination={destination}
          preferences={baseAttractions
            .filter((attraction) => attraction.preference?.length)
            .map((attraction) => attraction.preference as string)}
          results={results}
          setResults={setResults}
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
    <div className='app'>
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

      <footer>
        <p className='footer-text'>
          Please note that extended space travel might bring you back to the
          future ???{' '}
          <a
            href='https://github.com/osadezu/touristify'
            target='_blank'
            rel='noopener noreferrer'>
            Visit GitHub Repo
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
