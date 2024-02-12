"use client";
import { FormEvent, Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/shared/Form";
import Loading from "../loding";
const page = () => {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const router = useRouter();

  const createPrompts = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user._id,
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
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Form
          type={"Create"}
          post={post}
          setPost={setPost}
          submiting={submitting}
          handleSubmit={createPrompts}
        />
      </Suspense>
    </div>
  );
};

export default page;
