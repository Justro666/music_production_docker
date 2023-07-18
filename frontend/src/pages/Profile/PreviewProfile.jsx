import React from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import BackLink from '../../components/Layouts/BackLink';
import MusicData from '../../assets/images/musicdata.png';
import { Link } from 'react-router-dom';

const PreviewProfile = () => {
  return (
    <div className="w-full h-full px-5 py-10">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      <div className="w-3/4 md:w-2/5 py-14 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl flex flex-col space-y-4 items-center">
        <Link
          to={'/profile/identity'}
          className="absolute top-5 right-5 bg-secondaryColor text-white px-5 py-2 rounded-md"
        >
          <span>Identity</span>
        </Link>

        <div className="flex flex-col items-center space-y-6">
          <img src={MusicData} alt="" className="w-28" />

          <p className="text-xl font-semibold">Inuyashaki Dio</p>
        </div>

        <div className="w-3/4 space-y-8">
          <div className="flex w-full ">
            <p className="w-56">Band Name</p>
            <p className="w-16">-</p>
            <p>SHAWLAWLAlaW</p>
          </div>

          <div className="flex w-full">
            <p className="w-56">CAE/IPI</p>
            <p className="w-16">-</p>
            <p>11121234123</p>
          </div>

          <div className="flex w-full">
            <p className="w-56">ISRC</p>
            <p className="w-16">-</p>
            <p>US-ABC-12-34567</p>
          </div>

          <div className="flex w-full">
            <p className="w-56">TROs</p>
            <p className="w-16">-</p>
            <p>Label</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-16 flex w-full justify-start items-center">
        <BackLink to={`/profile`} />
      </div>
    </div>
  );
};

export default PreviewProfile;
