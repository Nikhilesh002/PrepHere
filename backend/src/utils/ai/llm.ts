import Groq from "groq-sdk";
import { configs } from "../../configs";
import { ChatCompletionMessage } from "groq-sdk/resources/chat/completions";

const client = new Groq({
  apiKey: configs.groqApiKey,
  maxRetries: 1,
});

const makeMessages = (prompt: string, aiMessage: string) => {
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

const askGroq = async (prompt: string, aiMessage: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: makeMessages(prompt, aiMessage) as ChatCompletionMessage[],
      // model: "gemma2-9b-it",
      model: "llama3-70b-8192",
    });

    const resp = chatCompletion.choices[0].message.content ?? "Error with AI";
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return "Error with AI";
  }
};

const askOllama = async (
  prompt: string,
  aiMessage: string
): Promise<string> => {
  try {
    const chatCompletion = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // model: "deepseek-r1:1.5b",
        model: "llama3.2:3b",
        messages: makeMessages(prompt, aiMessage),
        stream: false,
        top_p: 1,
        temperature: 0.2,
        max_tokens: 1024,
        stop: null,
      }),
    }).then((res) => res.json());

    const resp = (chatCompletion.message.content as string) ?? "Error with AI";

    if (resp.includes("</think>")) {
      return resp.split("</think>")[1];
    }

    return resp;
  } catch (error) {
    console.log(error);
    return "Error with AI";
  }
};

export const askLlm = async (
  prompt: string,
  aiMessage: string
): Promise<string> => {
  let aiJsonRes = "";
  if (configs.nodeEnv !== "production") {
    aiJsonRes = await askGroq(prompt, aiMessage);
  } else {
    aiJsonRes = await askOllama(prompt, aiMessage);
  }

  if (aiJsonRes.includes("```json")) {
    aiJsonRes = aiJsonRes.split("```json")[1].split("```")[0];
  }

  return aiJsonRes;
};
