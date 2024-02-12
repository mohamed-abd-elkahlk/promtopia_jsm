import Prompt from "@/models/prompt";
import { IPostsParams } from "@/types";
import { connectToDB } from "@/utils/database";

export const GET = async (
  requset: Request,
  { params }: { params: IPostsParams }
) => {
  try {
    await connectToDB();
    const prompts = await Prompt.findById(params.id).populate("createor");

    if (!prompts) {
      return new Response(
        JSON.stringify({
          messge: `prompt with this id: ${params.id} does no exists`,
        }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PATCH = async (
  requset: Request,
  { params }: { params: IPostsParams }
) => {
  const { prompt, tag } = await requset.json();
  try {
    await connectToDB();
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      params.id,
      { prompt, tag },
      { new: true }
    );
    if (!updatedPrompt) {
      return new Response(
        JSON.stringify({
          messge: `prompt with this id: ${params.id} does no exists`,
        }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const DELETE = async (
  requset: Request,
  { params }: { params: IPostsParams }
) => {
  try {
    await connectToDB();
    const deletedPropmt = await Prompt.findByIdAndDelete(params.id);

    if (!deletedPropmt) {
      return new Response(
        JSON.stringify({
          messge: `prompt with this id: ${params.id} does not exists`,
        }),
        { status: 404 }
      );
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
