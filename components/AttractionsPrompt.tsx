import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

import { Attraction } from '../shared/types';
import BaseAttraction from '../components/BaseAttraction';

type AppProps = {
  destination: string;
  baseAttractions: Attraction[];
  setBaseAttractions: Dispatch<SetStateAction<Attraction[]>>;
  setHasPreferences: Dispatch<SetStateAction<boolean>>;
};

export default function AttractionsPrompt({
  destination,
  baseAttractions,
  setBaseAttractions,
  setHasPreferences,
}: AppProps) {
  const [isLoading, setLoading] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    // Prevent race condition
    let mounted = true;
    setLoading(true);

    axios
      .get(`api/attractions/${destination}`)
      .then((response) => {
        // Do not attempt to update state if unmounted
        if (!mounted) return;
        console.log(response);
        const attractions = response.data.results.map(
          (description: string): Attraction => ({
            description: description,
            preference: null,
          })
        );
        setBaseAttractions(attractions);
        setLoading(false);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isFilled) setHasPreferences(true);
  }

  function updateAttraction(index: number, attraction: Attraction) {
    const newAttractions = [...baseAttractions];
    newAttractions[index] = attraction;
    setBaseAttractions(newAttractions);

    // Update isFilled state
    const complete = newAttractions.some((attraction) => attraction.preference);
    setIsFilled(complete);
  }

  function handlePreference(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void {
    const newAttraction = { ...baseAttractions[index] };
    newAttraction.preference = event.target.value;
    updateAttraction(index, newAttraction);
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
      <p>These are some common attractions at your destination.</p>
      <p>
        But that would be too easy! Can you tell me if you like any of these
        options and why? You can type anything like{' '}
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
            />
          ))}
        </ul>
        <input
          type='submit'
          disabled={!isFilled}
          value='Show me my recommendations!'
        />
      </form>
    </div>
  );
}
