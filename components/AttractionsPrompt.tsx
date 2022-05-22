import { useEffect, useState } from 'react';
import axios from 'axios';

type AppProps = {
  destination: string;
};

export default function AttractionsPrompt({ destination }: AppProps) {
  const [baseAttractions, setBaseAttractions] = useState<string[] | null>(null);
  const [isLoading, setLoading] = useState(false);

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
        setBaseAttractions(response.data.baseAttractions);
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
        <h2>One sec, jogging my memory!</h2>
      </div>
    );
  }

  if (!baseAttractions?.length) {
    return (
      <div>
        <h2>Apologies! I can&quot;t think of anything right now.</h2>
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
            <li key={i}>{attraction}</li>
          ))}
        </ul>
        <input type='submit' value='Show me my recommendations!' />
      </form>
    </div>
  );
}
