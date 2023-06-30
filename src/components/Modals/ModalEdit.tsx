import { useEffect, useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModalEdit } from "../../app/features/modal/modalSlice";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../app/features/post/postApiSlice";
import { Spinner } from "..";
import { RootState } from "../../app/store";
import { PostType } from "../../../types";
import { BASE_URL } from "../../constants";

const ModalEdit = () => {
  const post = useSelector(
    (state: RootState) => state.modal.modalPayload.post
  ) as PostType;

  const [caption, setCaption] = useState(post.caption ?? "");
  const [postFileType] = useState(post.contentType ?? "");
  const dispatch = useDispatch();

  const [updatePost, { isLoading, isSuccess }] = useUpdatePostMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(hideModalEdit());
    }
  }, [isSuccess, dispatch]);

  const handleClose = () => {
    dispatch(hideModalEdit());

    // dispatch(resetCP());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      caption,
    };

    await updatePost({ postId: post._id, body });
  };

  const previewElement = useMemo(() => {
    if (postFileType === "image") {
      return (
        <img
          src={`${BASE_URL}/thumbnail/${post.thumbnail}`}
          alt=""
          className="w-full h-full object-contain object-center"
        ></img>
      );
    } else if (postFileType === "video") {
      return (
        <video
          src={`${BASE_URL}/thumbnail/${post.thumbnail}`}
          autoPlay
          muted
          loop
          className="w-full h-full object-contain object-center"
        ></video>
      );
    }
  }, [postFileType, post]);

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed z-[50] w-screen h-screen bg-black/60"
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md text-lightText dark:text-darkText">
        {isLoading && <Spinner />}
        {!isLoading && (
          <form
            onSubmit={handleSubmit}
            className="w-[80vw] lg:w-[50rem] bg-lightBg dark:bg-grayIg rounded-md overflow-hidden animate-fadeIn"
            encType="multipart/form-data"
          >
            <div className="flex justify-between items-center px-6 py-3 border border-transparent border-b-darkBg/10 dark:border-b-white/20">
              <button onClick={handleClose} type="button">
                x
              </button>
              <h2>Edit post</h2>
              <button type="submit" className="text-blue-500 font-semibold">
                done
              </button>
            </div>
            <div className="flex flex-col md:flex-row h-[30rem]">
              <div className="flex-1 md:basis-[65%] h-2 md:h-full bg-lightBg dark:bg-grayIg flex justify-center items-center">
                {previewElement}
              </div>
              <div className="space-y-2 flex-1 w-full h-full border border-transparent border-l-darkBg/10 dark:border-l-white/20 p-3">
                <div className="flex gap-x-2 items-center"></div>
                <div>
                  <textarea
                    className="outline-none bg-transparent"
                    name="caption"
                    onChange={(e) => setCaption(e.target.value)}
                    value={caption}
                    placeholder="Write caption"
                    cols={30}
                    rows={10}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ModalEdit;
