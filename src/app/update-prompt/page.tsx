"use client";
import { Suspense, useState } from "react";
import Form from "@/components/shared/Form";
import Loading from "../loding";
const page = () => {
  const [post, setPost] = useState({ prompt: "", tag: "" });

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Form type={"Edit"} post={post} setPost={setPost} />
      </Suspense>
    </div>
  );
};

export default page;
