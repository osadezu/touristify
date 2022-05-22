import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

import { Attraction } from '../shared/types';
import BaseAttraction from '../components/BaseAttraction';

type AppProps = {
  destination: string;
};

export default function AttractionsPrompt({ destination }: AppProps) {
  const [baseAttractions, setBaseAttractions] = useState<Attraction[]>([]);
  const [isLoading, setLoading] = useState(false);

  function updateAttraction(index: number, attraction: Attraction) {
    const newAttractions = [...baseAttractions];
    newAttractions[index] = attraction;
    setBaseAttractions(newAttractions);
  }

  function handlePreference(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void {
    const newAttraction = { ...baseAttractions[index] };
    newAttraction.preference = event.target.value;
    updateAttraction(index, newAttraction);
  }

  function handleDislike(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void {
    const newAttraction = { ...baseAttractions[index] };
    newAttraction.dislike = event.target.checked;
    updateAttraction(index, newAttraction);
  }

  useEffect(() => {
    // Prevent race condition
    let mounted = true;
    setLoading(true);

    axios
      .get(`api/destinations/${destination}`)
      .then((response) => {
        // Do not attempt to update state if unmounted
        if (!mounted) return;
        console.log(response);
        const attractions = response.data.baseAttractions.map(
          (description: string): Attraction => ({
            description: description,
            preference: null,
            dislike: false,
          })
        );
        setBaseAttractions(attractions);
        setLoading(false);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, [destination]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  if (isLoading) {
    return (
      <div>
        <h2>{destination}...</h2>
        <p>One sec, jogging my memory!</p>
      </div>
    );
  }

  if (!baseAttractions?.length) {
    return (
      <div>
        <h2>Apologies! I can&apos;t think of anything right now.</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>{destination}, awesome!</h2>
      <p>
        These are some common attractions at your destination, but that would be
        too easy!
      </p>
      <p>
        Can you tell me if you like any of these options and why?
        <br />
        You can type anything like{' '}
        <em>&ldquo;I really enjoy boat rides&rdquo;</em> or{' '}
        <em>&ldquo;Museums are amazing!&rdquo;</em>
      </p>
      <form onSubmit={handleSubmit}>
        <ul>
          {baseAttractions?.map((attraction, i) => (
            <BaseAttraction
              key={i}
              index={i}
              attraction={attraction}
              handlePreference={handlePreference}
              handleDislike={handleDislike}
            />
          ))}
        </ul>
        <input type='submit' value='Show me my recommendations!' />
      </form>
    </div>
  );
}
