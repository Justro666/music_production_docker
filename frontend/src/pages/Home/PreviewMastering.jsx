import React from 'react';
import MasteringPng from '../../assets/images/masteringPng.png';
import SongTimeLine from '../../assets/images/songtimeline.png';
import PlayButton from '../../assets/images/playbutton.png';
import BackLink from '../../components/Layouts/BackLink';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import { AiFillSave } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

const PreviewMastering = () => {
  const masteringId = useParams();

  return (
    <div className="w-full h-full py-1 px-5">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      <div className="flex justify-center absolute top-1/2 left-0 -translate-y-1/2 w-full">
        <div className="w-1/2 md:w-2/5 lg:w-1/4 h-[450px] bg-secondaryBg rounded-md flex flex-col p-8 items-center relative">
          <img src={MasteringPng} alt="" className="w-24" />

          <p className="my-10">Lollipop (1)</p>

          <div className="w-full">
            <img src={SongTimeLine} alt="" />

            <div className="w-full flex justify-between text-xs px-2 mt-3">
              <p>0:00</p>
              <p>3:45</p>
            </div>

            <div className="mt-3 px-1">
              <img src={PlayButton} alt="" className="w-8" />
            </div>
          </div>

          <div className="absolute bottom-5 right-5">
            <p className="text-primaryColor">Powered By Landr</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-10 flex w-full justify-between items-center">
        <BackLink to={`/mastering/edit/${masteringId.id}`} />

        <button className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center">
          <AiFillSave />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default PreviewMastering;
