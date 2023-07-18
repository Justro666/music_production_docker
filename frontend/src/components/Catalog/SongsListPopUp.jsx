import React from 'react';
import { BsFilter } from 'react-icons/bs';
import SongRecordingsPng from '../../assets/images/songrecordingsPng.png';

const SongsListPopUp = (props) => {
  const songLists = [];

  for (let index = 0; index < 10; index++) {
    songLists.push(
      <tr className="bg-secondaryBg">
        <td className="pr-6 py-1 bg-mainBg">
          <input type="checkbox" className="w-4 h-4" />
        </td>
        <td className="whitespace-nowrap px-6 py-1 rounded-tl-xl rounded-bl-xl">
          <img src={SongRecordingsPng} alt="" className="w-12" />
        </td>
        <td className="whitespace-nowrap px-6 py-1">
          <p className="font-bold">Champion of the frozenwaste</p>
        </td>
        <td className="whitespace-nowrap px-6 py-1">Album Name</td>
        <td className="whitespace-nowrap px-6 py-1 text-center rounded-tr-xl rounded-br-xl">
          5:50
        </td>
      </tr>
    );
  }

  return (
    <div className="w-[60vw] bg-mainBg p-5 rounded-md">
      <p className="text-xl font-bold">Your Song Recordings</p>

      <div className="flex items-center space-x-2 mt-5">
        <input type="checkbox" className="w-4 h-4 rounded" id="allrecordings" />
        <label htmlFor="allrecordings">Select All</label>
      </div>
      <div className="w-full">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="h-[400px] 2xl:h-[600px] overflow-y-auto">
                <table
                  className="min-w-full text-left text-sm font-light rounded-md border-spacing-y-2 border-separate"
                  cellSpacing={12}
                >
                  <thead className="font-medium sticky top-0 bg-mainBg">
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
                            Album
                            <BsFilter className="ml-1 mt-0.5 text-xl" />
                          </span>
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-4">
                        <button>
                          <span className="flex">
                            Duration
                            <BsFilter className="ml-1 mt-0.5 text-xl" />
                          </span>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{songLists}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <button className="bg-secondaryBg px-8 py-2 rounded-lg" onClick={props.hideSongLists}>Cancel</button>
        <button className="bg-secondaryColor px-8 py-2 rounded-lg">
          Add Songs
        </button>
      </div>
    </div>
  );
};

export default SongsListPopUp;
