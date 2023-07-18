import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaFolderOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FolderItem = ({ index }) => {
  const [view, setView] = useState(false);

  return (
    <Link className="flex flex-col items-center w-64 h-48 px-5 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-lg relative">
      {view && (
        <div className="absolute top-8 right-2 bg-secondaryColor rounded-xl flex flex-col">
          <button className="py-2 px-3 transition-all duration-300  hover:bg-[rgba(0,0,0,0.2)]">
            View Info
          </button>
          <button className="py-2 px-3 border-y-2 transition-all duration-300  hover:bg-[rgba(0,0,0,0.2)]">
            Export PDF
          </button>
          <button className="py-2 px-3 transition-all duration-300  hover:bg-[rgba(0,0,0,0.2)]">
            Download as zip
          </button>
        </div>
      )}
      <button
        className="absolute top-0 right-0 text-3xl z-10 w-12 flex justify-center items-center transition-all duration-300 rounded-bl-xl hover:bg-[rgba(0,0,0,0.2)]"
        onClick={() => setView(!view)}
      >
        <BsThreeDots />
      </button>
      <FaFolderOpen className="text-white text-9xl" />
      <p>OB00{index}</p>
    </Link>
  );
};

export default FolderItem;
