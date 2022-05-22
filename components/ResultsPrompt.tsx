import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { stringify } from 'qs';

import { Attraction } from '../shared/types';

type AppProps = {
  destination: string;
  baseAttractions: Attraction[];
  doNewDestination: () => void;
};

function Results({
  destination,
  baseAttractions: preferences,
  doNewDestination,
}: AppProps) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Prevent race condition
    let mounted = true;
    setLoading(true);

    axios
      .get(`api/attractions/${destination}`, {
        params: {
          preferences: preferences,
        },
        paramsSerializer: (params) => {
          return stringify(params, { arrayFormat: 'repeat' });
        },
      })
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
        // setBaseAttractions(attractions);
        setLoading(false);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    doNewDestination();
  }

  return <div></div>;
}

export default Results;
