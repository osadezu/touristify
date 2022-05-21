import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type Data = {
  baseAttractions?: string[];
  statusCode?: number;
  message?: string;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function destinationHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // const sampletext1 =
    //   'List five activities for someone who is visiting New York City on holiday.\n' +
    //   '\n' +
    //   '1. Walk around the city\n' +
    //   '2. Take a Broadway show\n' +
    //   '3. Attend a Mets game\n' +
    //   '4. Tour the Statue of Liberty\n' +
    //   '5. Go to a big city zoo';

    // const sampletext2 =
    //   'List five activities for someone who is visiting New York City on holiday.\n' +
    //   '\n' +
    //   '1. Walk around the city and take in the sights and sounds.\n' +
    //   '2. Attend a Broadway show or visit one of the many museums.\n' +
    //   '3. Take in a Yankees or Mets game at the stadium.\n' +
    //   '4. Browse the many shops and boutiques in the downtown area.\n' +
    //   "5. Enjoy a delicious meal at one of the city's many restaurants.";

    const completion = await openai.createCompletion('text-curie-001', {
      prompt: `List five activities for someone who is visiting ${req.query.destination} on holiday.\n\n1.`,
      temperature: 0.7,
      max_tokens: 150,
      echo: true,
    });

    if (completion.data.choices && completion.data.choices[0].text) {
      // Split response string into lines and return enumerated options
      // This depends on GPT-3 following the numbered list pattern.
      const attractionsArray = completion.data.choices[0].text
        .split('\n')
        .filter((chunk) => /^[0-9]\. ?/.test(chunk));

      res.status(200).json({ baseAttractions: attractionsArray });
    } else {
      throw new Error('GPT-3 did not return data.');
    }
  } catch (error: any) {
    console.log(error.response);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
