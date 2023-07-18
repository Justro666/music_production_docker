import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdDownload } from 'react-icons/io';
import { BsFillTrashFill } from 'react-icons/bs';
import moment from 'moment';
import axios from 'axios';

const SongRecordings = ({ setLoading, search }) => {
  let [songRecordings, setSongRecordings] = useState([]);

  const fetchSongRecordings = async () => {
    try {
      const token = localStorage.getItem('token');

      const { data } = await axios.get('/cloud/songrecording_collection', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      // console.log(data.result.data);
      setSongRecordings((songRecordings = data.result.data));
      // console.log(songRecordings);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadMusic = async (musicId) => {
    setLoading((prevState) => (prevState = true));
    try {
      const token = localStorage.getItem('token');
      const body = {
        musicId: musicId,
      };
      const data = await axios.post('/cloud/songrecording_collection', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      // console.log(data.data);
      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      const url = window.URL.createObjectURL(new Blob([data.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'zippedFiles.zip');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMusic = async (musicId) => {
    setLoading((prevState) => (prevState = true));
    try {
      const token = localStorage.getItem('token');

      const body = {
        musicId: musicId,
      };

      const { data } = await axios.delete('/cloud/songrecording_collection', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      });

      fetchSongRecordings();

      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSongRecordings();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="h-[550px] 2xl:h-[700px] overflow-y-auto customScrollY pr-3">
            <table
              className="min-w-full text-left text-sm font-light rounded-md border-spacing-y-2 border-separate"
              cellSpacing={12}
            >
              <tbody>
                {songRecordings
                  .filter((songRecording) => {
                    return search.toLowerCase() === ''
                      ? songRecording
                      : songRecording.c1.toLowerCase().includes(search);
                  })
                  .map((songRecording) => (
                    <tr
                      key={songRecording._id}
                      className="py-2 bg-white hover:bg-secondaryColor cursor-pointer bg-opacity-10 backdrop-blur-lg"
                    >
                      <td className="whitespace-nowrap px-6 py-2  rounded-tl-xl rounded-bl-xl">
                        <p className="font-bold">{songRecording.c1}</p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {songRecording.c6.$numberDecimal} mins
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {songRecording.c5 === 0
                          ? 'pending'
                          : songRecording.c5 === 1
                          ? 'unfinish'
                          : songRecording.c5 === 2
                          ? 'finish'
                          : 'no data'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {moment(songRecording.updatedAt).calendar()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">Mp3</td>
                      <td className="whitespace-nowrap py-2">
                        <button className="text-sm font-semibold bg-primaryColor rounded-md px-3 py-2 text-black">
                          <Link>Mastering</Link>
                        </button>
                      </td>
                      <td className="whitespace-nowrap py-2">
                        <button
                          onClick={() => downloadMusic(songRecording._id)}
                          className="text-3xl text-white font-semibold"
                        >
                          <IoMdDownload />
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-2 rounded-tr-xl rounded-br-xl">
                        <button
                          onClick={() => deleteMusic(songRecording._id)}
                          className="text-3xl text-secondaryRed"
                        >
                          <BsFillTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongRecordings;
