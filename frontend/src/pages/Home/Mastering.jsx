import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import Landr from '../../assets/images/landr.png';
import BackLink from '../../components/Layouts/BackLink';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { BiSearch } from 'react-icons/bi';
import Loading from '../../sparepages/Loading';
import SessionExpired from '../../components/SessionExpired';

const Mastering = () => {
  let [songRecordings, setSongRecordings] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [permission, setPermission] = useState('view');
  const [tokenExpired, setTokenExpired] = useState(false);

  const navigate = useNavigate();

  const checkPermission = async () => {
    const token = localStorage.getItem('token');
    try {
      const body = {
        page: 'mastering_list',
        method: 'GET',
      };

      const { data } = await axios.post('/permitCheck', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data.result);

      if (data.result.error?.includes('Token Expire')) {
        setTokenExpired((prevState) => (prevState = true));
      }

      if (data.result.msg === 0) {
        setPermission((prevState) => (prevState = 'view'));
      } else if (data.result.msg === 1) {
        setPermission((prevState) => (prevState = 'full'));
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    document.title = 'Mastering - Overstood';

    checkPermission();
    fetchSongRecordings();
  }, []);

  return (
    <div className="w-full h-full py-3 px-5">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      {tokenExpired && <SessionExpired />}

      {loading && (
        <div className="w-screen h-screen fixed top-0 left-0 z-10">
          <Loading />
        </div>
      )}

      <div className="w-full flex justify-end items-center my-4">
        <div className="flex items-center justify-between space-x-3 bg-white px-5 py-3 rounded-full text-black w-96">
          <input
            type="text"
            placeholder="Search Here"
            className="focus:outline-none w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
          <BiSearch className="text-xl" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className="h-[600px] 2xl:h-[750px] overflow-y-auto customScrollY px-3">
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
                      <tr className="py-2" key={songRecording._id}>
                        <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-tl-xl rounded-bl-xl">
                          <p className="font-bold">{songRecording.c1}</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                          {songRecording.c6.$numberDecimal} mins
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                          {moment(songRecording.updatedAt).calendar()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                          mp3
                        </td>
                        <td className="whitespace-nowrap py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-tr-xl rounded-br-xl">
                          {!songRecording.c4 ? (
                            <button className="text-sm font-semibold bg-primaryColor rounded-md px-3 py-2 text-black">
                              <Link to={`edit/${songRecording._id}`}>
                                Mastering
                              </Link>
                            </button>
                          ) : (
                            <button className="text-sm font-semibold rounded-md px-3 py-2 text-black">
                              <img src={Landr} alt="" className="w-10" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}

                  {/* <tr className="">
                    <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-tl-xl rounded-bl-xl">
                      <p className="font-bold">T_T_T_T</p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                      10:30
                    </td>
                    <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                      20/12/2022
                    </td>
                    <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                      mp3
                    </td>
                    <td className="whitespace-nowrap py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-tr-xl rounded-br-xl">
                      <button className="text-sm font-semibold rounded-md px-3 py-2 text-black">
                        <img src={Landr} alt="" className="w-10" />
                      </button>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-10 flex w-full justify-between items-center">
        <BackLink to={'/'} />
      </div>
    </div>
  );
};

export default Mastering;
