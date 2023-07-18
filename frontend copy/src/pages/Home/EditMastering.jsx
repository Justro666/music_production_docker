import React from 'react';
import MasteringPng from '../../assets/images/masteringPng.png';
import BackLink from '../../components/Layouts/BackLink';
import { Link } from 'react-router-dom';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import { useParams } from 'react-router-dom';

const EditMastering = () => {
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

          <div className="absolute bottom-5 right-5">
            <p className="text-primaryColor">Powered By Landr</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-10 flex w-full justify-between items-center">
        <BackLink to={'/mastering'} />

        <Link
          to={`/mastering/edit/${masteringId.id}/preview`}
          className="bg-secondaryColor px-10 py-2 rounded-md flex space-x-3 items-center"
        >
          <span>Next</span>
        </Link>
      </div>
    </div>
  );
};

export default EditMastering;
