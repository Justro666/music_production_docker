import React from 'react';
import MainNavbar from './MainNavbar';
import { Outlet } from 'react-router-dom';
import QuickBall from '../QuickBall';

const RootLayout = ({ mainTitle, cloud, otherPage }) => {
  return (
    <div className="w-screen font-nunito overflow-hidden">
      <div className="fixed w-screen hidden md:block">
        <MainNavbar mainTitle={mainTitle} cloud={cloud} otherPage={otherPage} />
      </div>
      <main className="w-screen h-screen mt-[10vh] text-white block">
        <div className="z-10 absolute top-1/2 -translate-x-1/2 left-0">
          <QuickBall
            mainTitle={mainTitle}
            cloud={cloud}
            otherPage={otherPage}
          />
        </div>
        <Outlet />
      </main>
      <div className="w-screen h-screen flex items-center justify-center md:hidden">
        <p className="text-xl md:text-5xl text-white font-bold whitespace-nowrap">
          we do not support in mobile version
        </p>
      </div>
    </div>
  );
};

export default RootLayout;
