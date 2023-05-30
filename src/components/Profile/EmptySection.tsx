import React from "react";
import { useDispatch } from "react-redux";
import { showModalCreate } from "../../app/features/modal/modalSlice";

type PropType = {
  logo: React.ReactElement;
  title: string;
  desc: string;
};

const EmptySection = ({ logo, title, desc }: PropType) => {
  const dispatch = useDispatch();

  return (
    <main className="w-full h-80 flex flex-col justify-center items-center text-center gap-4">
      <div className="text-4xl p-3 border-2 border-darkBg dark:border-slate-500/50 rounded-full dark:text-slate-500/50">
        {logo}
      </div>
      <span className="font-extrabold text-3xl">{title}</span>
      <span className="text-sm max-w-sm">{desc}</span>
      {title === "Share Photos" && (
        <span
          onClick={() => dispatch(showModalCreate())}
          className="text-sm font-semibold text-blue-500 hover:text-lightText dark:hover:text-darkText  cursor-pointer"
        >
          Share your first photos
        </span>
      )}
    </main>
  );
};

export default EmptySection;
