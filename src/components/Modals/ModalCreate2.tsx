import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoImagesOutline } from "react-icons/io5";
import { createRef, useState } from "react";
import React, { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDispatch } from "react-redux";
import { hideModalCreate } from "../../app/features/modal/modalSlice";

const ModalCreate = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  const cropperRef = useRef<ReactCropperElement>(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    console.log(cropper?.getCroppedCanvas().toDataURL());
  };

  const getNewImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getCropData = async () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "newAvatar.png", { type: "image/png" });
        });

      console.log(file);
    }
  };

  return (
    <>
      <div
        onClick={() => dispatch(hideModalCreate())}
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md text-lightText dark:text-darkText">
        <div className="min-w-[80vw] md:min-w-[480px] h-[397px] md:h-[520px] bg-white dark:bg-grayIg rounded-xl overflow-hidden flex flex-col divide-y-[1px] divide-grayIg/20 dark:divide-lightBg/10 text-sm animate-fadeIn">
          <header className="flex justify-between items-center p-4">
            <div>
              <AiOutlineArrowLeft />
            </div>
            <div className="flex-1 text-center" onClick={getCropData}>
              Crop
            </div>
            <div>Next</div>
          </header>
          {!imageUrl && (
            <main className="w-full flex-1 flex justify-center items-center">
              <div className="flex flex-col items-center gap-4">
                <span className="text-6xl">
                  <IoImagesOutline />
                </span>
                <input
                  ref={inputRef}
                  type="file"
                  aria-hidden="true"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={getNewImageUrl}
                />
                <button
                  onClick={() => inputRef.current?.click()}
                  className="igButtonBlue"
                >
                  Select from computer
                </button>
              </div>
            </main>
          )}
          {imageUrl && (
            <main className="w-[520px] h-full flex-1 flex justify-center items-center">
              <Cropper
                src={imageUrl}
                dragMode="none"
                style={{ height: "90%", width: "100%", cursor: "pointer" }}
                cropBoxResizable={false}
                // cropBoxMovable={false}
                scalable={false}
                // Cropper.js options
                aspectRatio={1 / 1}
                guides={false}
                highlight={false}
                background={false}
                zoomable={false}
                autoCropArea={1}
                viewMode={1}
                crop={onCrop}
                ref={cropperRef}
              />
            </main>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalCreate;
