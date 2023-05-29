import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideModalCreate } from "../../app/features/modal/modalSlice";

const ModalCreate = () => {
  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = useState<File>();

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = false;
  const isSuccess = false;

  useEffect(() => {
    if (isSuccess) {
      dispatch(hideModalCreate());
    }
  }, [isSuccess, dispatch]);

  const handleClose = () => {
    dispatch(hideModalCreate());
    // dispatch(resetCP());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // const formdata = new FormData();

    // formdata.append("postimage", postImage);
    // formdata.append("caption", caption);

    // dispatch(createPost(formdata));
  };

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed z-[45] w-screen h-screen bg-black/60"
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md text-lightText dark:text-darkText">
        {/* {isLoading && <Spinner />} */}
        {!isLoading && (
          <form
            onSubmit={handleSubmit}
            className="w-[80vw] lg:w-[50rem] bg-lightBg dark:bg-grayIg rounded-md overflow-hidden"
            encType="multipart/form-data"
          >
            <div className="flex justify-between items-center px-6 py-3 border border-transparent border-b-darkBg/10 dark:border-b-white/20">
              <button onClick={handleClose} type="button">
                x
              </button>
              <h2>Create new post</h2>
              <button type="submit" className="text-blue-500 font-semibold">
                share
              </button>
            </div>
            <div className="flex flex-col md:flex-row h-[30rem]">
              <div className="basis-[65%] w-full h-full bg-lightBg dark:bg-grayIg flex justify-center items-center">
                {/* input file */}
                {postImage ? (
                  <img
                    src={URL.createObjectURL(postImage)}
                    alt=""
                    className="w-full h-full object-contain object-center"
                  ></img>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white font-semibold p-2 px-4 rounded-md hover:bg-blue-500/60"
                      onClick={() => inputRef?.current?.click()}
                      type="button"
                    >
                      Select File
                    </button>
                    <input
                      type="file"
                      name="postimage"
                      id="file"
                      ref={inputRef}
                      className="hidden"
                      onChange={(e) => {
                        e.target.files !== null &&
                          setPostImage(e?.target?.files[0]);
                      }}
                    />
                  </>
                )}
              </div>
              <div className="space-y-2 flex-1 w-full h-full border border-transparent border-l-darkBg/10 dark:border-l-white/20 p-3">
                <div className="flex gap-x-2 items-center">
                  {/* <div className="w-10 h-10 overflow-hidden rounded-full">
                    <img
                      src={BASE_URL + "/" + user?.profilePicture}
                      alt={user?.username}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{user?.username}</h4>
                    {/* <p className="text-sm text-gray-400">{user?.fullname}</p> 
                  </div> */}
                </div>
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

export default ModalCreate;