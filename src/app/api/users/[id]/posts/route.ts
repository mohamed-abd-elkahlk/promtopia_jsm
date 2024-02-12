import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { IPostsParams } from "@/types";

export const GET = async (
  requset: Request,
  { params }: { params: IPostsParams }
) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ createor: params.id }).populate(
      "createor"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
