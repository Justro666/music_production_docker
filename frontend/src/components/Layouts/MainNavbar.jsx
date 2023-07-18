import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { IoMdNotifications } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import Profile from '../../assets/images/profile.png';
import { NavLink } from 'react-router-dom';
import OpaqueLogo from '../../assets/images/opaquelogo.png';

const MainNavbar = ({ mainTitle, cloud, otherPage }) => {
  return (
    <div className="relative w-screen h-[10vh] bg-secondaryGray flex justify-center items-center">
      <div className="h-full bg-secondaryGray absolute left-0 px-5 flex items-center z-10">
        <img src={OpaqueLogo} alt="" />
      </div>

      <ul
        className={`absolute right-8 flex h-full items-center space-x-5 transition-all duration-1000`}
      >
        <li className="h-full">
          <NavLink
            to="/teamMember"
            onClick={otherPage}
            className={({ isActive }) =>
              isActive
                ? 'h-full flex items-center justify-center hover:text-secondaryColor text-secondaryColor text-2xl'
                : 'h-full flex items-center justify-center hover:text-secondaryColor text-white text-2xl'
            }
          >
            <HiUsers className="cursor-pointer" />
          </NavLink>
        </li>
        <li className="h-full">
          <NavLink
            to="/notifications"
            onClick={otherPage}
            className={({ isActive }) =>
              isActive
                ? 'h-full flex items-center justify-center hover:text-secondaryColor text-secondaryColor text-2xl'
                : 'h-full flex items-center justify-center hover:text-secondaryColor text-white text-2xl'
            }
          >
            <IoMdNotifications className="cursor-pointer" />
          </NavLink>
        </li>
        <li className="h-full">
          <NavLink
            to="/settings"
            onClick={otherPage}
            className={({ isActive }) =>
              isActive
                ? 'h-full flex items-center justify-center hover:text-secondaryColor text-secondaryColor text-2xl'
                : 'h-full flex items-center justify-center hover:text-secondaryColor text-white text-2xl'
            }
          >
            <IoSettingsSharp className="cursor-pointer" />
          </NavLink>
        </li>
        <li className="h-full">
          <NavLink
            to="/profile"
            onClick={otherPage}
            className={({ isActive }) =>
              isActive
                ? 'h-full flex items-center justify-center'
                : 'h-full flex items-center justify-center'
            }
          >
            <img src={Profile} alt="" className="w-12 cursor-pointer" />
          </NavLink>
        </li>
      </ul>

      <p
        className={`flex items-center font-semibold space-x-2 transition-all duration-700 opacity-100`}
      >
        <span className="text-white">{mainTitle}</span>
        <span className="uppercase text-secondaryColor">LWIN ZIN KO LATT</span>
      </p>
    </div>
  );
};

export default MainNavbar;
