import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setToast } from "../../app/features/modal/modalSlice";

const Toast = ({ message }: { message: string }) => {
  const { toast } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    let timeOut: number;
    if (toast) {
      timeOut = setTimeout(() => {
        dispatch(setToast(""));
      }, 1000);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [toast]);

  return (
    <div className="fixed text-sm z-[45] bottom-0 w-screen h-12 bg-semigrayIg flex items-center px-6 text-white left-0 animate-fadeIn">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
