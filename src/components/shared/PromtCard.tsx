"use cleint";
import { IPost } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const PromtCard = ({
  post,
  handleClick,
}: {
  post: IPost;
  handleClick?: Dispatch<SetStateAction<string>>;
}) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 2000);
  };
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
          onClick={() =>
            router.push(
              `/profile?id=${post.createor?._id}&name=${post.createor?.username}`
            )
          }
        >
          <Image
            src={post.createor?.image!}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.createor?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.createor?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy-image"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700 text-wrap">
        {post.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={(e) => {
          handleClick!(e.currentTarget.innerText);
        }}
      >
        {post.tag}
      </p>
      {session?.user._id === post.createor?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-3 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => {
              router.push(`/update-prompt?id=${post._id}`);
            }}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={async () => {
              const hasConfirm = confirm("Are you sure to delete this prompt");
              if (hasConfirm) {
                try {
                  const req = await fetch(`/api/prompt/${post._id}`, {
                    method: "DELETE",
                  });

                  if (req.ok) location.reload();
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromtCard;
