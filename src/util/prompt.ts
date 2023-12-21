import OpenAI from "openai";

export const getOpenAIInstance = async (): Promise<OpenAI> => {
  const { OPENAI_API_KEY } = process.env;

  if (!OPENAI_API_KEY) {
    throw new Error("Missing env OPENAI_API_KEY");
  }

  return new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
};

export const queryOpenAI = async (prompt: string): Promise<string> => {
  const openai = await getOpenAIInstance();

  const image = await openai.images.generate({ model: "dall-e-2", prompt });

  return image.data[0].url ?? "";
};
