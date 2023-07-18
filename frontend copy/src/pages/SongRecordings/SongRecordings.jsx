import React from 'react';
import { BsFilter, BsTrash3 } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Recording from '../../assets/images/recording.png';

const SongRecordings = () => {
  const recordingLists = [];

  for (let index = 0; index < 5; index++) {
    recordingLists.push(
      <tr className="bg-secondaryBg">
        <td className="whitespace-nowrap px-6 py-2 bg-mainBg">
          <input type="checkbox" className="w-4 h-4 rounded" />
        </td>
        <td className="whitespace-nowrap px-6 py-2 rounded-tl-xl rounded-bl-xl">
          <img src={Recording} alt="" className="w-12" />
        </td>
        <td className="whitespace-nowrap px-6 py-2">
          <p className="font-bold">Lollipop (1)</p>
          <p className="text-xs">wav</p>
        </td>
        <td className="whitespace-nowrap px-6 py-2">3:30</td>
        <td className="whitespace-nowrap px-6 py-2">30 min ago</td>
        <td className="whitespace-nowrap px-6 py-2 text-secondaryColor">
          pending
        </td>
        <td className="whitespace-nowrap px-6 py-2 text-3xl">
          <AiOutlineCloudDownload />
        </td>
        <td className="whitespace-nowrap px-6 py-2">
          <Link>
            <button className="py-2 px-8 bg-primaryColor rounded-md">
              Mastering
            </button>
          </Link>
        </td>
        <td className="whitespace-nowrap px-6 py-2">
          <Link>
            <button className="py-2 px-8 bg-secondaryColor rounded-md">
              Copyright
            </button>
          </Link>
        </td>
        <td className="whitespace-nowrap px-6 py-2 text-center rounded-tr-xl rounded-br-xl">
          <button className="text-2xl">
            <BsTrash3 />
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div className="w-full relative h-full pt-5">
      <div className="flex justify-between items-center">
        <Link
          to={'documents'}
          className="py-2 px-8 bg-secondaryColor rounded-md"
        >
          Document
        </Link>

        <div className="flex items-center bg-secondaryBg px-3 py-2 rounded-xl space-x-4">
          <GoSearch />
          <input
            type="text"
            className="bg-secondaryBg w-96 outline-none"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 mb-4">
        <div className="flex space-x-5">
          <div className="flex space-x-3 items-center">
            <input type="checkbox" className="w-4 h-4" />
            <p className="text-primaryColor">Mastering</p>
          </div>
          <div className="flex space-x-3 items-center">
            <input type="checkbox" className="w-4 h-4" />
            <p className="text-tertiary">Copyright</p>
          </div>
          <div className="flex space-x-3 items-center">
            <input type="checkbox" className="w-4 h-4" />
            <p className="text-secondaryColor">Request Publish</p>
          </div>
        </div>

        <div className="flex space-x-5">
          <Link to={'mastering'} className="py-2 px-8 bg-primaryColor rounded-md">
            Mastering
          </Link>
          <Link className="py-2 px-8 bg-tertiary rounded-md">Copyright</Link>
          <Link className="py-2 px-8 bg-secondaryColor rounded-md">
            Request Publish
          </Link>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="h-[450px] 2xl:h-[600px] overflow-y-auto">
                <table
                  className="min-w-full text-left text-sm font-light rounded-md border-spacing-y-2 border-separate"
                  cellSpacing={12}
                >
                  <thead className="font-medium sticky top-0 bg-primaryBackground">
                    <tr>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4 ">
                        <button>
                          <span className="flex">
                            Name
                            <BsFilter className="ml-1 mt-0.5 text-xl" />
                          </span>
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-4 ">
                        <button>
                          <span className="flex">
                            Duration
                            <BsFilter className="ml-1 mt-0.5 text-xl" />
                          </span>
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-4">
                        <button>
                          <span className="flex">
                            Create At
                            <BsFilter className="ml-1 mt-0.5 text-xl" />
                          </span>
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4 "></th>
                      <th scope="col" className="px-6 py-4 "></th>
                    </tr>
                  </thead>
                  <tbody>{recordingLists}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0">
        <Link
          to={'songupload'}
          className="py-2 px-8 bg-secondaryColor rounded-md"
        >
          Upload
        </Link>
      </div>
    </div>
  );
};

export default SongRecordings;
