import React from 'react';
import { MdLyrics } from 'react-icons/md';

const Templates = () => {
  const documents = [];

  for (let index = 0; index < 10; index++) {
    documents.push(
      <div className="py-5 bg-white bg-opacity-10 backdrop-blur-lg rounded-md flex flex-col items-center w-96 space-y-5">
        <div className="border-b-2 w-1/2 flex justify-center pb-5">
          <MdLyrics className="text-9xl" />
        </div>

        <div className="flex w-full justify-between items-center px-10">
          <p>Music Sheet ({index + 1})</p>
          <button className=" bg-primaryColor rounded-md px-5 py-2 text-sm">
            Download
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-5 relative px-5 py-1">
      <div className="grid grid-cols-3 gap-10 h-[550px] 2xl:h-[700px] overflow-y-auto customScrollY">
        {documents}
      </div>
    </div>
  );
};

export default Templates;
