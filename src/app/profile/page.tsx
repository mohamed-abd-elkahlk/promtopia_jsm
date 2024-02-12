"use client";
import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@/components/shared/Profile";
import { IPost } from "@/types";
const page = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState<IPost[]>();
  const router = useRouter();
  const param = useSearchParams();
  const id = param.get("id");
  const name = param.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user._id}/posts`, {
        method: "GET",
      });
      const data: IPost[] = await res.json();

      return setPost(data);
    };
    const fetchPostsToAnotherOne = async () => {
      const res = await fetch(`/api/users/${id}/posts`, {
        method: "GET",
      });
      const data: IPost[] = await res.json();

      setPost(data);
      return;
    };
    if (id && name) fetchPostsToAnotherOne();
    if (session?.user._id) fetchPosts();
  }, []);

  return <Profile name={name || "my"} desc={"welcome here"} data={post!} />;
};

export default page;
