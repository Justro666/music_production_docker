import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

const SongsRequestList = (props) => {
  const songRequestList = [];

  for (let index = 0; index < 10; index++) {
    songRequestList.push(
      <div className="w-full flex justify-between items-center py-3 px-10 bg-secondaryBg rounded-xl">
        <p>New Member</p>

        <p>newmember@gmail.com</p>

        <div className="flex space-x-10">
          <button className=" text-2xl w-8 h-8 rounded-full bg-primaryColor flex justify-center items-center text-secondaryBg">
            <BsCheckLg />
          </button>
          <button className=" text-2xl w-8 h-8 rounded-full bg-secondaryColor flex justify-center items-center text-secondaryBg">
            <RxCross2 />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[60vw] h-[60vh] bg-mainBg pb-5 px-5 rounded-md overflow-y-auto">
      <div className="w-full flex justify-end sticky top-0 bg-mainBg pt-5 pb-1">
        <button
          className="text-white text-2xl"
          onClick={props.hideSongRequestList}
        >
          <RxCross2 />
        </button>
      </div>
      <p className="text-xl font-bold sticky top-12 bg-mainBg">Request List</p>

      <div className="w-full flex flex-col space-y-3 mt-5">
        {songRequestList}
      </div>
    </div>
  );
};

export default SongsRequestList;
