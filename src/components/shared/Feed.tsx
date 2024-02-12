"use client";
import { useState, useEffect, ChangeEvent } from "react";
import PromtCardList from "./PromtCardList";
import { IPost } from "@/types";
import useDebounce from "@/hooks/useDebounce";
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState<IPost[]>();
  const searchValue = useDebounce(searchText, 1000);

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
          required
          className="search_input peer"
        />
      </form>
      <PromtCardList data={post!} handleClick={setSearchText} />
    </section>
  );
};

export default Feed;
