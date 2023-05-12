import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createImage({
  prompt: "Weather Storm image of a hill in Macedonia mountain range",
  response_format: "url",
  size: "512x512",
});

const result = JSON.stringify(completion.data, null, 2);
console.log(result);
