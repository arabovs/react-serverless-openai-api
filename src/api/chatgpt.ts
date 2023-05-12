import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

import { Configuration, OpenAIApi } from "openai";

const getTextPrompt = async (prompt: string) => {
  const configuration = new Configuration({
    apiKey: process.env.GATSBY_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
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
  const data = await getTextPrompt(prompt);
  res.status(200).json({ message: data });
};

export default getDalleImage;
