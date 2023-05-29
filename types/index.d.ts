export type UserShortType = {
  _id: string;
  username: string;
  profilePicture?: string;
};

export type UserType = {
  _id: string;
  fullname?: string;
  username: string;
  slug: string;
  email: string;
  profilePicture?: string;
  profileBio?: string;
  posts: [PostType];
  saved: [PostType];
  followings: [string];
  followers: [string];
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
  content: [string];
  postedBy: UserShortType;
  likes: [UserShortType];
  comments: [{ user: UserShortType; comment: string }];
  savedBy: [string];
  createdAt: Date;
  updatedAt: Date;
};
