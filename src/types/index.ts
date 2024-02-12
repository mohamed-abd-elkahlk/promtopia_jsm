export type IPost = {
  _id?: string;
  prompt: string;
  tag: string;
  createor?: {
    _id?: string;
    email?: string;
    image?: string;
    username?: string;
  };
};

export type IPostsParams = {
  id?: string;
};
