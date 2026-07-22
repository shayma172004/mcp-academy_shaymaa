import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "shaymaa-mcp-server",
  version: "0.1.0",
});

server.registerTool(
  "greet",
  {
    title: "Greet",
    description:
      "Greets a person and introduces Shaymaa Dar Taha using her full name.",
    inputSchema: z.object({
      name: z
        .string()
        .min(1, "Please enter a name")
        .describe("The name of the person to greet"),
    }),
  },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `Hello ${name}, I'm Shaymaa Dar Taha!`,
        },
      ],
    };
  }
);

// Tool 2: Introduce Me
server.registerTool(
  "introduce_me",
  {
    title: "Introduce Me",
    description: "Returns a short introduction about Shaymaa Dar Taha.",
    inputSchema: z.object({}),
  },
  async () => {
    return {
      content: [
        {
          type: "text",
          text: "Hi! My name is Shaymaa Dar Taha. I am a Computer Engineering student at Birzeit University, and this is my first MCP server.",
        },
      ],
    };
  }
);

server.registerTool(
  "shout_name",
  {
    title: "Shout Name",
    description: "Displays Shaymaa Dar Taha's name in uppercase.",
    inputSchema: z.object({}),
  },
  async () => {
    return {
      content: [
        {
          type: "text",
          text: "SHAYMAA DAR TAHA!!!",
        },
      ],
    };
  }
);
const transport = new StdioServerTransport();
await server.connect(transport);