import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

import OpenAI from "openai";

const getImageUrl = async (prompt: string) => {
  
  const openai = new OpenAI({
    apiKey: process.env.GATSBY_OPENAI_API_KEY
  });
  const completion = await openai.images.generate({
    prompt: "A beautiful astrological woman or man holding flower with sun and moon " + prompt,
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
