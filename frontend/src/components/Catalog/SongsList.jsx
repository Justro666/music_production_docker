import React from 'react';
import { BsFilter, BsTrash3 } from 'react-icons/bs';
import SongListPng from '../../assets/images/songListPng.png';

const SongsList = () => {
  const songLists = [];

  for (let index = 0; index < 5; index++) {
    songLists.push(
      <tr className="bg-secondaryBg">
        <td className="whitespace-nowrap px-6 py-2 rounded-tl-xl rounded-bl-xl">
          <img src={SongListPng} alt="" className="w-12" />
        </td>
        <td className="whitespace-nowrap px-6 py-2">
          <p className="font-bold">Lollipop (1)</p>
          <p className="text-xs">wav</p>
        </td>
        <td className="whitespace-nowrap px-6 py-2">3:30</td>
        <td className="whitespace-nowrap px-6 py-2">30 min ago</td>
        <td className="whitespace-nowrap px-6 py-2 text-center rounded-tr-xl rounded-br-xl">
          <button className="text-2xl">
            <BsTrash3 />
          </button>
        </td>
      </tr>
    );
  }

  return (
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
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                    {songLists}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongsList;
