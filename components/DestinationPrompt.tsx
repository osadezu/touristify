import { useState, Dispatch, SetStateAction } from 'react';

type AppProps = {
  setDestination: Dispatch<SetStateAction<string | null>>;
};

export default function DestinationPrompt({ setDestination }: AppProps) {
  const [input, setInput] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDestination(input);
  }

  return (
    <div>
      <h2>Welcome!</h2>
      <p>Let me help you find something to do on your next trip.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='destination'>Where are you travelling?</label>
        <input
          type='text'
          id='destination'
          name='destination'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete='off'
        />
        <input type='submit' value='Next' />
      </form>
    </div>
  );
}
