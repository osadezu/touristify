import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { stringify } from 'qs';

type AppProps = {
  destination: string;
  preferences: string[];
  results: string[] | null;
  setResults: Dispatch<SetStateAction<string[] | null>>;
  doNewDestination: () => void;
};

function Results({
  destination,
  preferences,
  results,
  setResults,
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
        console.log(response.data);
        setResults(response.data.results);
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

  if (isLoading) {
    return (
      <div>
        <h2>{destination}...</h2>
        <p>One sec, I&apos;m sure I&apos;ve got something for you!</p>
      </div>
    );
  }

  if (!results?.length) {
    return (
      <div>
        <h2>Apologies! I can&apos;t think of anything right now.</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>{destination}, here we go!</h2>
      <ul>
        {results.map((description, i) => (
          <li key={i}>{description}</li>
        ))}
      </ul>
      <p>Not so bad for a robot right?</p>
    </div>
  );
}

export default Results;
