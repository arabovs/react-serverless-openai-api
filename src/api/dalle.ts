import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

import { Configuration, OpenAIApi } from "openai";

const getImageUrl = async (prompt: string) => {
  const configuration = new Configuration({
    apiKey: process.env.GATSBY_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createImage({
    prompt: prompt,
    response_format: "url",
    size: "512x512",
  });
  const result = JSON.stringify(completion.data, null, 2);
  //@ts-ignore
  return result;
};

const getDalleImage = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  const prompt = JSON.parse(req.body).prompt;
  const data = await getImageUrl(prompt);
  res.status(200).json({ message: data });
};

export default getDalleImage;
