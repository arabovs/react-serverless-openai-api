import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

import OpenAI from "openai";

const getTextPrompt = async (prompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env.GATSBY_OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const result = JSON.stringify(completion.choices[0].message.content, null, 2);
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
