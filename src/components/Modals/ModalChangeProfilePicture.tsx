import { createRef, useEffect, useState } from "react";
import {
  useEditProfilePictureMutation,
  useRemoveProfilePictureMutation,
} from "../../app/features/user/userApiSlice";
import { useDispatch } from "react-redux";
import {
  editProfilePictureState,
  removeProfilePictureState,
} from "../../app/features/auth/authSlice";

type PropTypes = {
  hide: () => void;
};

const ModalChangeProfilePicture = ({ hide }: PropTypes) => {
  const dispatch = useDispatch();
  const [editProfilePicture, { isSuccess: isSuccessEdit }] =
    useEditProfilePictureMutation();
  const [removeProfilePicture, { isSuccess: isSuccessRemove }] =
    useRemoveProfilePictureMutation();

  const handleHideModal = () => {
    hide();
  };
  const inputRef = createRef<HTMLInputElement>();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files != undefined) {
      // setProfilePicture(e.target.files[0]);

      const formData = new FormData();
      formData.append("profilePicture", e.target.files[0]);

      const user = await editProfilePicture(formData);

      if ("data" in user) {
        dispatch(editProfilePictureState(user.data.profilePicture));
      }
    }
  };

  const handleRemoveProfilePicture = async () => {
    const res = await removeProfilePicture({});

    if ("data" in res) {
      dispatch(removeProfilePictureState());
    }
  };

  useEffect(() => {
    if (isSuccessEdit || isSuccessRemove) {
      hide();
    }
  }, [isSuccessEdit, isSuccessRemove]);

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-lg">
        <div className="w-[80vw] xs:w-[25rem] bg-white dark:bg-grayIg rounded-lg overflow-hidden flex flex-col divide-y-[1px] divide-darkBg/10 dark:divide-white/10 text-sm animate-fadeIn text-lightText dark:text-darkText text-center">
          <h1 className="text-xl py-6">Change Profile Picture</h1>
          <input
            ref={inputRef}
            type="file"
            onChange={handleChange}
            className="hidden"
            aria-hidden="true"
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full py-3 active:bg-gray-300/30 font-bold text-blue-500"
          >
            Upload Photo
          </button>
          <button
            onClick={handleRemoveProfilePicture}
            className="w-full py-3 active:bg-gray-300/30 font-bold text-red-500"
          >
            Remove Current Photo
          </button>
          <button
            className="w-full py-3 active:bg-gray-300/30"
            onClick={handleHideModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalChangeProfilePicture;
