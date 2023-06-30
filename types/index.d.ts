export type UserShortType = {
  _id: string;
  username: string;
  slug: string;
  profilePicture?: string;
  fullname?: string;
};

export type UserType = {
  _id: string;
  fullname?: string;
  username: string;
  slug: string;
  email: string;
  profilePicture?: string;
  profileBio?: string;
  posts: PostType[];
  saved: PostType[];
  followings: string[];
  followers: string[];
  birthday?: Date;
  address?: string;
  totalPost?: number;
  totalFollowers?: number;
  totalFollowings?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PostType = {
  _id: string;
  contentType?: string;
  caption?: string;
  content: string[];
  thumbnail: string;
  postedBy: UserShortType;
  likes: UserShortType[];
  comments: [{ _id: string; user: UserShortType; comment: string }];
  totalLikes?: number;
  totalComments?: number;
  savedBy: string[];
  createdAt: Date;
  updatedAt: Date;
};
