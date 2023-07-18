import React from 'react';
import MasteringPng from '../../assets/images/masteringPng.png';
import SongTimeLine from '../../assets/images/songtimeline.png'
import PlayButton from '../../assets/images/playbutton.png'
import BackLink from '../../components/Layouts/BackLink';
import { Link } from 'react-router-dom';

const MasteringReview = () => {
  return (
    <div className="w-full h-full relative pt-2">
      <p className="text-2xl font-bold my-5">Mastering Review</p>

      <div className="flex justify-center mt-20">
        <div className="w-1/4 h-[450px] bg-secondaryBg rounded-md flex flex-col p-8 items-center relative">
          <img src={MasteringPng} alt="" className="w-24" />

          <p className='my-10'>Lollipop (1)</p>

          <div className='w-full'>
            <img src={SongTimeLine} alt="" />

            <div className='w-full flex justify-between text-xs px-2 mt-3'>
                <p>0:00</p>
                <p>3:45</p>
            </div>

            <div className='mt-3 px-1'>
                <img src={PlayButton} alt="" className='w-8' />
            </div>
          </div>

          <div className='absolute bottom-5 right-5'>
            <p className='text-primaryColor'>Powered By Landr</p>
          </div>
        </div>
      </div>

      <BackLink to={'/songrecordings/mastering'} />

      <Link to={'copyright'} className="absolute bottom-20 right-0 bg-tertiary px-8 py-2 rounded-lg">
        Copyright
      </Link>
    </div>
  );
};

export default MasteringReview;
