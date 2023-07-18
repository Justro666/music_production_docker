import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import MusicData from '../../assets/images/musicdata.png';
import { AiFillQuestionCircle, AiFillSave } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bandName, setBandName] = useState("");
  const [caeIpi, setCaeIpi] = useState("");
  const [isrc, setIsrc] = useState("");
  

  useEffect(() => {
    document.title = 'Profile - Overstood';
  }, []);

  return (
    <div className="w-full h-full space-y-5 px-5 py-1">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      <div className="w-full flex flex-col items-center absolute top-1/2 left-0 -translate-y-1/2">
        <div className="flex flex-col w-2/3 py-8 rounded-lg items-center bg-white bg-opacity-10 backdrop-blur-lg">
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white text-black">
            <img src={MusicData} alt="" />
          </div>

          <div className="flex flex-col items-center relative space-y-2 mt-5">
            <div className="flex space-x-4 w-[500px]">
              <div className="flex flex-col space-y-2 w-1/2">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
                />
              </div>

              <div className="flex flex-col space-y-2 w-1/2">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2 w-[500px]">
              <label htmlFor="">Band Name</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
              />
            </div>

            <div className="flex flex-col space-y-2 w-[500px]">
              <label htmlFor="">CAE/IPI</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
              />
            </div>

            <div className="flex flex-col space-y-2 w-[500px]">
              <label htmlFor="">ISRC</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
              />
            </div>

            <div className="flex flex-col space-y-2 w-[500px]">
              <label htmlFor="">TROs</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
              />
            </div>

            <div className="w-full flex justify-end pt-4">
              <button className="py-2 px-4 bg-secondaryBlue rounded-lg flex items-center space-x-3">
                <span>Ask to admin</span>
                <AiFillQuestionCircle />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-16 flex w-full justify-end items-center">
        <Link
          to={`previewProfile`}
          className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
        >
          <AiFillSave />
          <span>Save</span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
