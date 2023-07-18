import React from 'react';
import MasteringPng from '../../assets/images/masteringPng.png';
import BackLink from '../../components/Layouts/BackLink';
import { Link } from 'react-router-dom';

const Mastering = () => {
  return (
    <div className="w-full h-full relative pt-2">
      <p className="text-2xl font-bold my-5">Mastering</p>

      <div className="flex justify-center mt-20">
        <div className="w-1/4 h-[450px] bg-secondaryBg rounded-md flex flex-col p-8 items-center relative">
          <img src={MasteringPng} alt="" className="w-24" />

          <div className="w-full space-y-3 mt-8">
            <p>Style</p>
            <div className="w-full flex justify-between">
              <div className="flex space-x-3 items-center">
                <input type="checkbox" className="w-4 h-4" />
                <p>Warn</p>
              </div>
              <div className="flex space-x-3 items-center">
                <input type="checkbox" className="w-4 h-4" />
                <p>Balanced</p>
              </div>
              <div className="flex space-x-3 items-center">
                <input type="checkbox" className="w-4 h-4" />
                <p>Open</p>
              </div>
            </div>
          </div>

          <div className="w-full space-y-3 mt-8">
            <p>Loudness</p>
            <div className="w-full flex justify-between">
              <div className="flex space-x-3 items-center">
                <input type="checkbox" className="w-4 h-4" />
                <p>Low</p>
              </div>
              <div className="flex space-x-3 items-center">
                <input type="checkbox" className="w-4 h-4" />
                <p>Medium</p>
              </div>
              <div className="flex space-x-3 items-center">
                <input type="checkbox" className="w-4 h-4" />
                <p>High</p>
              </div>
            </div>
          </div>

          <div className='absolute bottom-5 right-5'>
            <p className='text-primaryColor'>Powered By Landr</p>
          </div>
        </div>
      </div>

      <BackLink to={'/songrecordings'} />

      <Link to={'masteringReview'} className="absolute bottom-20 right-0 bg-secondaryColor px-8 py-2 rounded-lg">
        Next
      </Link>
    </div>
  );
};

export default Mastering;
