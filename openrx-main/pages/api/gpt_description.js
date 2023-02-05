export default async function handler(req, res) {
  var medication = req.body;
  //   var medication = "Penicillin";

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_GPT_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Return information about " +
      medication +
      'in this form: {"Description/what it treats": string,"side effects":string}',
    max_tokens: 200,
    temperature: 0,
  });

  var output = response.data["choices"][0]["text"];

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(output);
}
