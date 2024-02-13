"use client";
import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@/components/shared/Profile";
import { IPost } from "@/types";
const page = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState<IPost[]>();
  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>("");

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
  const ProfileBugFix = () => {
    "use client";
    const param = useSearchParams();
    const name = param.get("name");
    const id = param.get("id");

    setName(name || "");
    setId(id || "");
    return <Profile name={name || "my"} desc={"welcome here"} data={post!} />;
  };
  return <ProfileBugFix />;
};

export default page;
