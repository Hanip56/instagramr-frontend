import React, { useState } from "react";
import { Footer, ModalChangeProfilePicture } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { BASE_URL } from "../constants";
import { useEditProfileMutation } from "../app/features/user/userApiSlice";

const Edit = () => {
  const [showModalPhoto, setShowModalPhoto] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState({
    fullname: user?.fullname,
    username: user?.username,
    profileBio: user?.profileBio,
    email: user?.email,
  });

  const [editProfile, { isLoading }] = useEditProfileMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await editProfile(form);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {showModalPhoto && (
        <ModalChangeProfilePicture hide={() => setShowModalPhoto(false)} />
      )}
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <div className="max-w-4xl mx-auto mt-6">
          <main className="bg-white dark:bg-darkBg w-full flex border border-gray-500/50 rounded-sm py-2 px-4 md:py-4 md:px-6">
            <div className="basis-40 hidden md:block">
              <h2 className="text-xl">Edit Profile</h2>
            </div>
            <div className="space-y-4 p-2 w-full">
              <div className="flex gap-x-6 items-center md:ml-24">
                <div className="w-8 h-8 overflow-hidden rounded-full">
                  <img
                    src={`${BASE_URL}/${user?.profilePicture}`}
                    alt={user?.username}
                    className="object-cover w-full h-full object-center"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{user?.username}</h4>
                  <button
                    className="font-semibold text-sm text-blue-500 hover:text-lightText dark:hover:text-darkText"
                    onClick={() => setShowModalPhoto(true)}
                  >
                    change profile picture
                  </button>
                </div>
              </div>
              <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <div className="formControl">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="fullname"
                    placeholder="Name"
                    value={form.fullname}
                    onChange={handleChange}
                  />
                </div>
                <div className="formControl">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={form.username}
                    name="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="formControl">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    name="profileBio"
                    id="bio"
                    cols={30}
                    rows={5}
                    placeholder="Bio"
                    value={form.profileBio}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="formControl">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <button className="relative w-28 py-1 px-4 mx-auto md:ml-[9.5rem] text-sm text-white font-semibold bg-blue-500 rounded-md p-1 mt-3 outline-none overflow-hidden flex justify-center items-center">
                  {isLoading && (
                    <div className="w-4 h-4 m-1 border-2 border-r-transparent rounded-full animate-spin" />
                  )}
                  {!isLoading && "Submit"}
                </button>
              </form>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Edit;
