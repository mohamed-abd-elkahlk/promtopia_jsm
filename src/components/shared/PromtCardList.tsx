import { IPost } from "@/types";
import PromtCard from "./PromtCard";
import { Dispatch, SetStateAction } from "react";

const PromtCardList = async ({
  data,
  handleClick,
}: {
  data?: IPost[];
  handleClick: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.length! > 0 ? (
        data?.map((post: IPost) => (
          <PromtCard key={post?._id} post={post} handleClick={handleClick} />
        ))
      ) : (
        <h1 className="head_text orange_gradient text-center">NO DATA FOUND</h1>
      )}
    </div>
  );
};

export default PromtCardList;
