import React from 'react';
import SongUploadPng from '../../assets/images/songupload.png';
import ImageUpload from '../../assets/images/ImageUpload.png';
import BackLink from '../../components/Layouts/BackLink';

const SongUpload = () => {
  return (
    <div className="w-full h-full relative">
      <p className="text-2xl font-bold mt-5">Upload Song Recording</p>

      <div className="w-2/3 flex flex-col items-center space-y-5 m-auto py-5 px-10 rounded-md bg-secondaryBg mt-10">
        <div className="flex flex-col space-y-3 w-4/6">
          <label htmlFor="">Song Title</label>
          <input
            type="text"
            className="bg-white text-black rounded-xl p-2 outline-none w-full"
          />
        </div>

        <div className="flex flex-col space-y-3 w-4/6">
          <label htmlFor="">Album name (optional)</label>
          <input
            type="text"
            className="bg-white text-black rounded-xl p-2 outline-none w-full"
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-5">
          <div>
            <p className="mb-3">Song</p>
            <div className="py-5 bg-secondaryColor rounded-xl flex items-center justify-center space-x-4">
              <div>
                <img src={SongUploadPng} alt="" className="w-16" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold">Drag and Drop your file here</p>
                <p className="font-thin">File supported: WAV/mp3</p>
                <p className="text-xl">Or</p>
                <button className="py-2 px-10 border-2 rounded-full border-opacity-50 text-xs border-[rgba(255,255,255,0.5)]">
                  Browse files
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3">Artworks</p>
            <div className="py-5 bg-secondaryColor rounded-xl flex items-center justify-center space-x-4">
              <div>
                <img src={ImageUpload} alt="" className="w-16" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold">Drag and Drop your file here</p>
                <p className="font-thin">File supported: WAV/mp3</p>
                <p className="text-xl">Or</p>
                <button className="py-2 px-10 border-2 rounded-full border-opacity-50 text-xs border-[rgba(255,255,255,0.5)]">
                  Browse files
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <button className="py-2 px-8 bg-primaryColor rounded-md">
            Upload
          </button>
        </div>
      </div>

      <BackLink to={'/songrecordings'} />
    </div>
  );
};

export default SongUpload;
