"use client";
import { useState, useEffect, ChangeEvent, Suspense } from "react";
import PromtCardList from "./PromtCardList";
import { IPost } from "@/types";
import useDebounce from "@/hooks/useDebounce";
import Loading from "@/app/loding";
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState<IPost[]>();
  const searchValue = useDebounce(searchText, 1500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/prompt`, {
        method: "GET",
      });
      const data: IPost[] = (await res.json()) || [];
      return setPost(data);
    };
    const fetchSearchedPosts = async () => {
      const res = await fetch(`/api/search?query=${searchValue}`, {
        method: "GET",
      });
      const data: IPost[] = await res.json();
      return setPost(data);
    };
    if (searchValue) fetchSearchedPosts();
    if (searchValue === "") fetchPosts();
  }, [searchValue]);
  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearch}
          className="search_input peer"
        />
      </form>
      <Suspense fallback={<Loading />}>
        <PromtCardList data={post!} handleClick={setSearchText} />
      </Suspense>
    </section>
  );
};

export default Feed;
