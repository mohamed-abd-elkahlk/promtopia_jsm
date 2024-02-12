import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (requset: Request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("createor");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
