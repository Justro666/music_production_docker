import React, { useState } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import { BsFillBriefcaseFill, BsFillCloudArrowUpFill } from 'react-icons/bs';
import { IoSettings, IoMusicalNotes } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const QuickBall = ({ mainTitle, cloud, otherPage }) => {
  const [open, setOpen] = useState(false);

  return (
    <button
      className="bg-secondaryColor w-12 h-12 rounded-full relative"
      onClick={() => setOpen(!open)}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 right-0 text-2xl transition-all duration-700 z-20 ${
          open ? 'rotate-180' : 'rotate-0'
        }`}
      >
        <AiFillCaretRight />
      </div>

      <NavLink
        to={'/'}
        onClick={otherPage}
        className={({ isActive }) =>
          isActive
            ? `w-full h-full rounded-full absolute transition-all duration-700 flex justify-center items-center text-white bg-secondaryColor ${
                open
                  ? '-top-28 left-16 scale-150 opacity-100 z-10'
                  : 'top-0 left-0 scale-100 opacity-0 -z-10'
              }`
            : `w-full h-full rounded-full absolute transition-all duration-700 flex justify-center items-center text-secondaryColor bg-secondaryGray ${
                open
                  ? '-top-28 left-16 scale-150 opacity-100 z-10'
                  : 'top-0 left-0 scale-100 opacity-0 -z-10'
              }`
        }
      >
        <BsFillBriefcaseFill />
      </NavLink>

      <NavLink
        to={`/mycollections`}
        onClick={cloud}
        className={({ isActive }) =>
          isActive
            ? `w-full h-full rounded-full absolute transition-all duration-700 flex justify-center items-center text-white bg-secondaryColor ${
                open
                  ? '-top-12 left-32 scale-150 opacity-100 z-10'
                  : 'top-0 left-0 scale-100 opacity-0 -z-10'
              }`
            : `w-full h-full rounded-full absolute transition-all duration-700 flex justify-center items-center text-secondaryColor bg-secondaryGray ${
                open
                  ? '-top-12 left-32 scale-150 opacity-100 z-10'
                  : 'top-0 left-0 scale-100 opacity-0 -z-10'
              }`
        }
      >
        <BsFillCloudArrowUpFill />
      </NavLink>

      <NavLink
        to={'/productManager'}
        onClick={otherPage}
        className={({ isActive }) =>
          isActive
            ? `w-full h-full rounded-full absolute transition-all duration-700 flex justify-center items-center text-white bg-secondaryColor ${
                open
                  ? 'top-12 left-32 scale-150 opacity-100 z-10'
                  : 'top-0 left-0 scale-100 opacity-0 -z-10'
              }`
            : `w-full h-full rounded-full absolute transition-all duration-700 flex justify-center items-center text-secondaryColor bg-secondaryGray ${
                open
                  ? 'top-12 left-32 scale-150 opacity-100 z-10'
                  : 'top-0 left-0 scale-100 opacity-0 -z-10'
              }`
        }
      >
        <IoSettings />
      </NavLink>

      <NavLink
        to={'/music'}
        onClick={otherPage}
        className={({ isActive }) =>
          isActive
            ? `w-full h-full rounded-full absolute transition-all duration-700 flex justify-center items-center text-white bg-secondaryColor ${
                open
                  ? 'top-28 left-16 scale-150 opacity-100 z-10'
                  : 'top-0 left-0 scale-100 opacity-0 -z-10'
              }`
            : `w-full h-full rounded-full absolute transition-all duration-700 flex justify-center items-center text-secondaryColor bg-secondaryGray ${
                open
                  ? 'top-28 left-16 scale-150 opacity-100 z-10'
                  : 'top-0 left-0 scale-100 opacity-0 -z-10'
              }`
        }
      >
        <IoMusicalNotes />
      </NavLink>
    </button>
  );
};

export default QuickBall;
