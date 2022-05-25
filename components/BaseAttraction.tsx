import { Attraction } from '../shared/types';

type AppProps = {
  index: number;
  attraction: Attraction;
  handlePreference: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

function baseAttraction({ index, attraction, handlePreference }: AppProps) {
  return (
    <li>
      <fieldset className='preference'>
        <legend>{attraction.description}</legend>
        <label htmlFor={`preference-${index}`}>What you like:</label>
        <input
          type='text'
          id={`preference-${index}`}
          onChange={(e) => handlePreference(e, index)}
        />
      </fieldset>
    </li>
  );
}

export default baseAttraction;
