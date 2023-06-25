import postImage from "./postImage.jpg";
import vidEx from "./vid2.mp4";

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

export const reelData = {
  _id: "120123424",
  caption: "caption",
  content: [vidEx],
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
