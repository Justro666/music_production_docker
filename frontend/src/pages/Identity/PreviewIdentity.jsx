import React from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import BackLink from '../../components/Layouts/BackLink';
import MusicData from '../../assets/images/musicdata.png';
import { Link } from 'react-router-dom';

const PreviewIdentity = () => {
  return (
    <div className="w-full h-full px-5 py-10">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      <div className="w-3/4 md:w-2/5 py-16 absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl flex flex-col space-y-6 items-center">
        <Link
          to={'/profile'}
          className="absolute top-5 right-5 bg-secondaryColor text-white px-5 py-2 rounded-md"
        >
          <span>Profile</span>
        </Link>

        <div className="flex flex-col items-center">
          <img src={MusicData} alt="" className="w-28" />

          <div className="space-y-2 w-full text-center mt-2">
            <p className="text-xl font-semibold">Terror Bass</p>
            <p className="text-xs">Lwin Ko Zin Latt</p>
          </div>
        </div>

        <div className="w-3/4 space-y-8">
          <div className="flex w-full ">
            <p className="w-56">ISNI</p>
            <p className="w-16">-</p>
            <p>11121234123</p>
          </div>

          <div className="flex w-full">
            <p className="w-56">CAE/IPI</p>
            <p className="w-16">-</p>
            <p>11121234123</p>
          </div>

          <div className="flex w-full">
            <p className="w-56">ISRC</p>
            <p className="w-16">-</p>
            <p>11121234123</p>
          </div>

          <div className="flex w-full">
            <p className="w-56">Type</p>
            <p className="w-16">-</p>
            <p>Label</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-16 flex w-full justify-start items-center">
        <BackLink to={`/profile/identity`} />
      </div>
    </div>
  );
};

export default PreviewIdentity;
