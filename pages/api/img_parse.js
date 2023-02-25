export default async function handler(req, res) {
  const async = require("async");
  const sleep = require("util").promisify(setTimeout);
  const ComputerVisionClient =
    require("@azure/cognitiveservices-computervision").ComputerVisionClient;
  const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;
  const key = process.env.NEXT_PUBLIC_AZURE_KEY;
  const endpoint = "https://westus2.api.cognitive.microsoft.com/";

  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
    endpoint
  );

  async function ret_ocr(url) {
    async function readTextFromURL(client, url) {
      let result = await client.read(url);
      let operation = result.operationLocation.split("/").slice(-1)[0];
      while (result.status !== "succeeded") {
        await sleep(1000);
        result = await client.getReadResult(operation);
      }
      return result.analyzeResult.readResults;
    }
    function ret_str(readResults) {
      var str = "";
      for (const page in readResults) {
        if (readResults.length > 1) {
          console.log(`==== Page: ${page}`);
        }
        const result = readResults[page];
        if (result.lines.length) {
          for (const line of result.lines) {
            str = str
              .concat(line.words.map((w) => w.text).join(" "))
              .concat(" ");
          }
        } else {
          console.log("No recognized text.");
        }
      }
      return str;
    }
    const printedTextSampleURL = url;
    const printedResult = await readTextFromURL(
      computerVisionClient,
      printedTextSampleURL
    );
    // console.log(printedResult[0].lines);
    return printedResult[0].lines
      .map((line) => line.words.map((word) => word.text).join(" "))
      .join(" ");
  }

  const raw_txt = await ret_ocr(req.body);

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_GPT_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Heres text from a drug label: " +
      raw_txt +
      'Return the data in this form: {"Name of Drug(short name)": return a string, "how many to take in a dose": return only int or "?" if information isnt there, "how many doses to take in a day": return only int or "?" if no information is provided, "any extra notes such as take by mouth or with food": return a string}'
      + " Now, given the name of the drug, return infromation about the drug in this json format: " +  '{"Description/what it treats": string,"side effects":a string that contains side effects and/or warns of substances that should not be taken with the drug} . Separate the two responses with a ~',
    max_tokens: 300,
    temperature: 0.1,
  });

  // return an error if the response is not successful
  if (response.status !== 200) {
    return res.status(500).json({ error: response.statusText });
  }

  var output = response.data["choices"][0]["text"];
  console.log(output);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );



  return res.status(200).json(output);
}
