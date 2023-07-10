import { IoPaperPlaneOutline } from "react-icons/io5";
import { useMessageOutlet } from "../../pages/Messages";

const PreChat = () => {
  const { handleShowModalNewMessage } = useMessageOutlet();

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-full">
      <div className="w-28 h-28 border-2 border-white rounded-full flex justify-center items-center">
        <span className="text-6xl">
          <IoPaperPlaneOutline />
        </span>
      </div>
      <h3 className="text-lg font-semibold">Your messages</h3>
      <p className="text-sm opacity-75 text-center">
        Send private photos and messages to a friend or group
      </p>
      <button className="igButtonBlue mt-2" onClick={handleShowModalNewMessage}>
        Send message
      </button>
    </div>
  );
};

export default PreChat;
