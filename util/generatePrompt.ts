export default function generatePrompt(
  destination: string,
  preferences?: string | string[]
): string {
  if (!preferences) {
    return `List five activities for someone who is visiting ${destination} on holiday.\n\n1.`;
  } else {
    let preferenceString;
    if (Array.isArray(preferences)) {
      preferenceString = preferences.map((item) => `- ${item}\n`).join('');
    } else {
      preferenceString = `- ${preferences}\n`;
    }

    let prompt = '';

    // const nycRegex = /(New York City|New York|NYC|NY)/i;
    // const cdmxRegex = /(Mexico City|CDMX)/i;

    // // Exclude the NYC sample document if this is the user's destination
    // if (!nycRegex.test(destination)) {
    //   prompt +=
    //     `These are some personal preferences for someone who is visiting New York City on holiday:\n- I like shopping\n- I like ferries and outdoor activities\n- I like exploring gastronomy\n\n` +
    //     `Based on these preferences, list five activities for a New York City holiday and describe why they are enjoyable:\n\n` +
    //     `1. Go shopping at one of the many famous shopping districts like Fifth Avenue or SoHo, walking around will be very enjoyable and the variety of luxury shops in unbelievable!\n2. Eat at some of the city's famous restaurants in Hell's Kitchen or Little Italy because this city has very interesting gastronomy.\n3. If you like nature and outdoor strolls, you can take a walk in one of the many beautiful parks like Central Park or Bryant Park.\n4. Go see a play at Lincoln Centre or the National Theatre because they are both high-quality performing arts venues.\n5. Go Out on a Nighttime Adventure like Going on a Nighttime Food Tour, which will enable you to explore some of the best restaurants and bars in the city at night.\n\n`;
    // }
    // if (!cdmxRegex.test(destination)) {
    //   prompt +=
    //     `These are some personal preferences for someone who is visiting Mexico City on holiday:\n- I like restaurants\n- I like parks\n\n` +
    //     `Based on these preferences, list five activities for a Mexico City holiday and describe why they are enjoyable:\n\n` +
    //     `1. Eat in a restaurant, sampling the traditional Mexican food is sure to be enjoyable. \n2. Go for a walk in one of the city's many beautiful parks like Xochimilco or Chapultepec Park.\n3. See a play at Teatro de la National and listen to live music at Zocalo Rotisserie while enjoying an ice cold drink! \n4. Shop until you drop at some of Mexico City's luxury malls like Plaza Garibaldi or San Angel Centro, there are plenty of stores to choose from! \n5. Going on themed tours such as A Day with the Aztecs, Wine Tasting & Cooking Class etc., which will give you an insight into history and culture behind these activities is always fun too!\n\n`;
    // }
    prompt +=
      `These are some personal preferences for someone who is visiting ${destination} on holiday:\n` +
      preferenceString +
      `\nBased on these preferences, list five activities for a ${destination} holiday and describe why they are enjoyable:\n\n1.`;
    return prompt;
  }
}
