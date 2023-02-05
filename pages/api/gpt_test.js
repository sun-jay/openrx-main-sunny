export default async function handler(req, res) {
  // async function getResponse(prompt) {
  //     const response = await fetch('https://api.openai.com/v1/engines/gpt-3/jobs', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${"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"}`
  //       },
  //       body: JSON.stringify({"model": "text-davinci-003", "prompt": prompt, "temperature": 0, "max_tokens": 100}),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to generate response, status: ${response.status}`);
  //     }

  //     const json = await response.json();
  //     return json.choices[0].text;
  //   }
  // // response = await getResponse("identify the portion of this text that is a prescription: " + raw_txt + "return the data in this form: {How many pills to take: int, when to take: int or ?, how many to take in a day: int or ?, for how many days to take: int or ?}",)
  // response = await getResponse("print hello")

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_GPT_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });

  var output = response.data["choices"][0];

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(output);
}
