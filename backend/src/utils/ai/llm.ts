import Groq from "groq-sdk";
import { configs } from "../../configs";
import { ChatCompletionMessage } from "groq-sdk/resources/chat/completions";

const client = new Groq({
  apiKey: process.env["GROQ_API_KEY"],
  maxRetries: 0,
});

const aiMessage = "You are a helpful assistant";

const makeMessages = (prompt: string) => {
  return [
    {
      role: "system",
      content: aiMessage,
    },
    {
      role: "user",
      content: prompt,
    },
  ];
};

const askGroq = async (prompt: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: makeMessages(prompt) as ChatCompletionMessage[],
      model: "gemma2-9b-it",
    });

    const resp = chatCompletion.choices[0].message.content ?? "Error with AI";

    return resp;
  } catch (error) {
    console.log(error);
    return "Error with AI";
  }
};

const askOllama = async (prompt: string): Promise<string> => {
  try {
    const chatCompletion = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-r1:1.5b",
        messages: makeMessages(prompt),
        stream: false,
        top_p: 1,
        temperature: 0,
        max_tokens: 1024,
        stop: null,
      }),
    }).then((res) => res.json());

    const resp = (chatCompletion.message.content as string) ?? "Error with AI";

    return resp.split("</think>\n\n")[1];
  } catch (error) {
    console.log(error);
    return "Error with AI";
  }
};

export const askLlm = () => {
  if (configs.nodeEnv === "production") {
    return askGroq;
  }
  return askOllama;
};
