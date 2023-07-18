import React from 'react';
import { BsFillSendFill } from 'react-icons/bs';

const HelpAndContactUs = () => {
  return (
    <div className="w-full h-[550px] flex justify-center">
      <div className="w-[800px] h-full flex flex-col justify-center items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-xl">
        <div className="w-full h-full p-5 overflow-y-auto"></div>

        <div className="w-full h-24 p-5 flex justify-center items-center">
          <div className="w-full h-full px-5 rounded-lg bg-secondaryGray flex items-center justify-between space-x-5">
            <input
              type="text"
              className="w-full bg-secondaryGray focus:outline-none"
              autoFocus
            />
            <button className="text-2xl">
              <BsFillSendFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndContactUs;
