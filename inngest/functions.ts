import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import Sandbox from "@e2b/code-interpreter";

export const helloWorld = inngest.createFunction(
  
  { id: "hello-world" },
  { event: "agent/hello" },

  async ({ event, step }) => {

     const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("cortex-nextjs-v3");
      return sandbox.sandboxId;
    });

    const supportAgent = createAgent({
    model: gemini({ model: "gemini-2.5-flash" }),
    name: "Hello World Agent",
    description: "a simple agent that say hello.",
    system: "You are an helper agent that say hello to the user.",
    // tools: [listChargesTool],
});

    const {output} = await supportAgent.run('Hii, how are you?');

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await Sandbox.connect(sandboxId);
      const host = sandbox.getHost(3000);

      return `http://${host}`;
    });

    console.log(output[0]);
    return {
      message: output[0]
    }
  },

);