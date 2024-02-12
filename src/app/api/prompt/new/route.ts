import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { error } from "console";
export const POST = async (req: Request, res: Response) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();

    const newPrompt = await Prompt.create({ createor: userId, prompt, tag });
    if (!newPrompt) throw Error;

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ messge: "filed to create new respone", resson: error }),
      { status: 500 }
    );
  }
};
