import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

import generatePrompt from '../../../util/generatePrompt';

type Data = {
  results?: string[];
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
  console.log('[destination].ts:21', req.query);

  const destination = req.query.destination as string;
  let preferences = req.query.preferences;
  let request;

  if (preferences?.length) {
    // Requesting improved attractions
    request = {
      prompt: generatePrompt(destination, preferences),
      temperature: 1,
      max_tokens: 1000,
      frequency_penalty: 2,
      presence_penalty: 2,
      echo: true,
    };
  } else {
    // Initial prompt for base attractions
    request = {
      prompt: generatePrompt(destination),
      temperature: 0.7,
      max_tokens: 150,
      echo: true,
    };
  }

  console.log('[destination].ts:47', request);

  try {
    const completion = await openai.createCompletion('text-curie-001', request);

    if (completion.data.choices && completion.data.choices[0].text) {
      // Split response string into lines and return enumerated options
      // This depends on GPT-3 following the numbered list pattern.
      const attractionsArray = completion.data.choices[0].text
        .split('\n')
        .filter((chunk) => /^[0-9]\. ?/.test(chunk));

      res.status(200).json({ results: attractionsArray });
    } else {
      throw new Error('GPT-3 did not return data.');
    }
  } catch (error: any) {
    console.log(error.response);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
