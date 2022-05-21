import { useEffect, useState } from 'react';
import axios from 'axios';

type AppProps = {
  destination: string;
};

export default function AttractionsPrompt({ destination }: AppProps) {
  const [baseOptions, setBaseOptions] = useState<string[] | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true; // Prevent race condition
    setLoading(true);

    axios
      .get(`api/attractions`, { params: { destination: destination } })
      .then((response) => {})
      .catch(console.error);
  }, [destination]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div>
      <h2>{destination}, awesome!</h2>
      <p>
        These are some common attractions at your destination, but that would be
        too easy!
      </p>
      <p>
        Can you tell me if you like any of these options and why? You can type
        anything like &ldquo;I really enjoy boat rides&rdquo; or &ldquo;Museums
        are amazing!&rdquo;
      </p>
      <form onSubmit={handleSubmit}>
        {/* Display base attractions form */}
        <input type='submit' value='Show me my recommendations!' />
      </form>
    </div>
  );
}
