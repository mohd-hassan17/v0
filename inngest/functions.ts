import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "agent/hello" },

  async ({ event, step }) => {

    const supportAgent = createAgent({
    model: gemini({ model: "gemini-2.5-flash" }),
    name: "Hello World Agent",
    description: "a simple agent that say hello.",
    system: "You are an helper agent that say hello to the user.",
    // tools: [listChargesTool],
});

    const {output} = await supportAgent.run('Hii, how are you?');

    console.log(output[0]);
    return {
      message: output[0]
    }
  },

);