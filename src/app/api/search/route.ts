import Prompt from "@/models/prompt";
import { IPost, IPostsParams } from "@/types";
import { type NextRequest } from "next/server";
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  try {
    const prompts: IPost[] = await Prompt.find({
      $or: [
        { tag: { $regex: query, $options: "i" } },
        { prompt: { $regex: query, $options: "i" } },
      ],
    }).populate("createor");

    if (!prompts)
      return new Response(JSON.stringify({ messge: "no propmt found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 200,
    });
  }
};
