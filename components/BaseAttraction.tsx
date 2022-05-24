import { Attraction } from '../shared/types';

type AppProps = {
  index: number;
  attraction: Attraction;
  handlePreference: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleDislike: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

function baseAttraction({
  index,
  attraction,
  handlePreference,
  handleDislike,
}: AppProps) {
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
        {/* <input
          type='checkbox'
          id={`dislike-${index}`}
          onChange={(e) => handleDislike(e, index)}
        />
        <label htmlFor={`dislike-${index}`}>I don&apos;t like this</label> */}
      </fieldset>
    </li>
  );
}

export default baseAttraction;
