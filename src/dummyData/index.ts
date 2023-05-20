import postImage from "./postImage.jpg";

export const postData = {
  _id: "120124",
  caption: "caption",
  image: postImage,
  postedBy: {
    _id: "12",
    username: "halfz",
    profilePicture: postImage,
  },
  likes: ["1"],
  savedBy: ["3"],
  comments: [
    {
      user: "4",
      comment: "comments",
      _id: "564",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};
