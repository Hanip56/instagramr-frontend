import { useDispatch, useSelector } from "react-redux";
import {
  hideModalOwnCardOptions,
  hideModalPost,
  setToast,
  showModalEdit,
} from "../../app/features/modal/modalSlice";
import { deletePostState } from "../../app/features/auth/authSlice";
import { RootState } from "../../app/store";
import { useDeletePostMutation } from "../../app/features/post/postApiSlice";

const ModalOwnCardOptions = () => {
  const dispatch = useDispatch();
  const postId = useSelector(
    (state: RootState) => state.modal.modalPayload.postId
  ) as string;

  const [deletePost] = useDeletePostMutation();

  const handleHideModal = () => {
    dispatch(hideModalOwnCardOptions());
  };

  const handleDelete = async () => {
    const res = await deletePost(postId);

    if ("data" in res) {
      dispatch(deletePostState(postId));
      dispatch(hideModalOwnCardOptions());
      dispatch(hideModalPost());
      dispatch(setToast("The post has been deleted"));
    }
  };
  const handleEdit = () => {
    dispatch(hideModalOwnCardOptions());
    dispatch(showModalEdit());
  };

  return (
    <div className="fixed z-[60]">
      <div
        className="fixed w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-lg">
        <div className="w-[80vw] xs:w-[25rem] bg-white dark:bg-grayIg rounded-lg overflow-hidden flex flex-col divide-y-[1px] divide-darkBg/10 dark:divide-white/10 text-sm animate-fadeIn text-lightText dark:text-darkText">
          <button
            className="w-full py-3 active:bg-gray-300/30 text-red-500 font-semibold"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="w-full py-3 active:bg-gray-300/30"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="w-full py-3 active:bg-gray-300/30"
            onClick={handleHideModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOwnCardOptions;
