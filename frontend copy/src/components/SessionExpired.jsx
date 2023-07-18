import React from 'react';
import { Link } from 'react-router-dom';
import { FcExpired } from 'react-icons/fc';

const SessionExpired = () => {
  const cleanUp = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black backdrop-blur-lg bg-opacity-10">
      <div className="relative w-96 h-64 text-center py-10 bg-white text-black rounded-lg">
        <div className="w-full flex justify-center text-5xl mb-4">
          <FcExpired />
        </div>
        <p className="text-xl font-bold">
          Your session expired! <br /> Please LOGIN
        </p>

        <Link
          to={'/login'}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-lg bg-tertiary"
          onClick={cleanUp}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SessionExpired;
