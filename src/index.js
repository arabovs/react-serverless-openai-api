import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content:
        "write a weather news article in simple English about todays weather forecast: Sunny and warm with moderate cloudiness that will increase in the afternoon and locally there will be conditions for torrential rain and rare thunder. A weak to moderate wind will blow from the south-east direction, which, due to the Povardarieto, will occasionally intensify. In Skopje, sunny with moderate cloudiness and a weak to moderate wind from the southeast direction.",
    },
  ],
});

const result = JSON.stringify(completion.data, null, 2);
console.log(result);
