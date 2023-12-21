// import { Configuration, type CreateCompletionRequest, OpenAIApi } from "openai";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  
});

// async function main() {
//   const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: 'gpt-3.5-turbo',
//   });
// }

// main();

// export const getOpenAIInstance = async (): Promise<OpenAIApi> => {
//   const { OPENAI_API_KEY } = process.env;

//   if (!OPENAI_API_KEY) {
//     throw new Error("Missing env OPENAI_API_KEY");
//   }

//   const configuration = new Configuration({
//     apiKey: OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);
//   return openai;
// };

export const queryOpenAI = async (prompt: string): Promise<string> => {
  //   const openai = await getOpenAIInstance();

  //   const config = prompt.model
  //     ? prompt
  //     : {
  //         model: "text-davinci-002",
  //         prompt: prompt.prompt,
  //         temperature: 0.6,
  //       };

  //   const completion = await openai.createCompletion(
  //     config as CreateCompletionRequest
  //   );

  //   return completion.data.choices[0].text;
  //   const chatCompletion = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: "Say this is a test" }],
  //     model: "gpt-3.5-turbo",
  //   });
  //   console.log(chatCompletion, prompt);

    const image = await openai.images.generate({ model: "dall-e-2", prompt });

  // const image = {
  //   data: [
  //     {
  //       url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-5JpFd4jtMI6LJdl3GcYXOx4L/user-E7WwzrUzkTnBegZHzBKhD4sG/img-EkiH6eELsDHTDDVSBlajE0Nh.png?st=2023-12-21T08%3A22%3A57Z&se=2023-12-21T10%3A22%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-20T23%3A05%3A34Z&ske=2023-12-21T23%3A05%3A34Z&sks=b&skv=2021-08-06&sig=H8lgueRNy0gl/njlqcLhCf7sOlTgZOIS0s28nFCAFIs%3D",
  //     },
  //   ],
  // };

  console.log(image.data, prompt);

  return image.data[0].url;
};
