import React from 'react';
import { MdAlbum, MdLibraryMusic } from 'react-icons/md';
import { GiMicrophone } from 'react-icons/gi'
import { SiMusicbrainz } from 'react-icons/si'
import { BsFillMicFill } from 'react-icons/bs'

const Services = () => {
  return (
    <div className="w-full h-full pt-5">
      <p className="text-center text-5xl font-bold my-10">Our Services</p>

      <div className="flex justify-around w-full mt-10">
        <div className="bg-white text-black flex flex-col items-center space-y-5 rounded-xl w-60 py-5 px-3">
          <div className='text-7xl'>
          <MdLibraryMusic />
          </div>
          <p className='text-2xl font-bold'>Lorem Ipsum</p>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi
            laborum commodi soluta recusandae nemo! Laborum veniam assumenda
            consequatur laboriosam.
          </p>
        </div>

        <div className="bg-white text-black flex flex-col items-center space-y-5 rounded-xl w-60 py-5 px-3">
          <div className='text-7xl'>
          <GiMicrophone />
          </div>
          <p className='text-2xl font-bold'>Lorem Ipsum</p>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi
            laborum commodi soluta recusandae nemo! Laborum veniam assumenda
            consequatur laboriosam.
          </p>
        </div>

        <div className="bg-white text-black flex flex-col items-center space-y-5 rounded-xl w-60 py-5 px-3">
          <div className='text-7xl'>
          <MdAlbum />
          </div>
          <p className='text-2xl font-bold'>Lorem Ipsum</p>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi
            laborum commodi soluta recusandae nemo! Laborum veniam assumenda
            consequatur laboriosam.
          </p>
        </div>

        <div className="bg-white text-black flex flex-col items-center space-y-5 rounded-xl w-60 py-5 px-3">
          <div className='text-7xl'>
          <SiMusicbrainz />
          </div>
          <p className='text-2xl font-bold'>Lorem Ipsum</p>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi
            laborum commodi soluta recusandae nemo! Laborum veniam assumenda
            consequatur laboriosam.
          </p>
        </div>

        <div className="bg-white text-black flex flex-col items-center space-y-5 rounded-xl w-60 py-5 px-3">
          <div className='text-7xl'>
          <BsFillMicFill />
          </div>
          <p className='text-2xl font-bold'>Lorem Ipsum</p>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi
            laborum commodi soluta recusandae nemo! Laborum veniam assumenda
            consequatur laboriosam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
