import { IPost } from "@/types";
import PromtCard from "./PromtCard";

const Profile = ({
  name,
  desc,
  data,
}: {
  name: string;
  desc: string;
  data: IPost[];
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data &&
          data?.map((post: IPost) => <PromtCard key={post?._id} post={post} />)}
      </div>
    </section>
  );
};

export default Profile;
