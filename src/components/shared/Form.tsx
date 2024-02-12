"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IPost } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Form = ({
  type,
  post,
  setPost,
  submiting,
  handleSubmit,
}: {
  type: string;
  post: IPost;
  setPost: Dispatch<SetStateAction<IPost>>;
  submiting?: boolean;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const propmtId = searchParams.get("id");

  const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (!propmtId) return; //TODO: add toast component
    try {
      const response = await fetch(`/api/prompt/${propmtId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else throw Error;
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const getPrompt = async () => {
      const res = await fetch(`/api/prompt/${propmtId}`, {
        method: "GET",
      });
      const data: IPost = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (propmtId) getPrompt();
  }, [propmtId]);
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className=" blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and Share amazing propmt with the world, and let your imagination
        run wild with any AI-powrded platform.
      </p>
      <form
        onSubmit={handleSubmit || updatePrompt}
        className="mt-10 max-w-2xl w-full flex-col flex gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your propmt"
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span>(#product,#webdev ,#idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cansle
          </Link>

          <button
            type="submit"
            disabled={submiting || submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submiting || submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
