import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import { BiSearch } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Loading from '../../sparepages/Loading';
import SessionExpired from '../../components/SessionExpired';

const ProductManager = () => {
  let [musicData, setMusicData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [permission, setPermission] = useState('view');
  const [tokenExpired, setTokenExpired] = useState(false);

  const navigate = useNavigate();

  const checkPermission = async () => {
    const token = localStorage.getItem('token');
    try {
      const body = {
        page: 'project_management',
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

  const fetchMusicData = async () => {
    try {
      console.log('hello');
      const token = localStorage.getItem('token');

      const { data } = await axios.get('/project/project_management', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);

      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      setMusicData((musicData = data.result.data));
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = 'Product Manager - Overstood';

    checkPermission();

    fetchMusicData();

    return () => {};
  }, []);

  return (
    <div className="w-full h-full space-y-5 relative px-5 py-1">
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

      <div className="w-full flex justify-end items-center">
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
            <div className="h-[550px] 2xl:h-[700px] overflow-y-auto customScrollY pr-3">
              <table
                className="min-w-full text-left text-sm font-light rounded-md border-spacing-y-2 border-separate"
                cellSpacing={12}
              >
                <tbody>
                  {musicData
                    ?.filter((music) => {
                      return search.toLowerCase() === ''
                        ? music
                        : music.c1.toLowerCase().includes(search);
                    })
                    .map((music) => (
                      <tr
                        key={music._id}
                        className="py-2 bg-white hover:bg-secondaryColor cursor-pointer bg-opacity-20 backdrop-blur-lg"
                      >
                        <td className="whitespace-nowrap px-6 py-2  rounded-tl-xl rounded-bl-xl">
                          <p className="font-bold">{music.c1}</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {music.c5 === 0
                            ? 'pending'
                            : music.c5 === 1
                            ? 'unfinish'
                            : music.c5 === 2
                            ? 'finish'
                            : 'no data'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {moment(music.updatedAt).calendar()}
                        </td>
                        <td className="whitespace-nowrap py-2 rounded-tr-xl rounded-br-xl">
                          {music.c5 === 1 || music.c5 === 3 ? (
                            <button className="text-sm font-semibold bg-white rounded-full px-3 py-2 text-black">
                              <Link to={`edit/${music._id}`}>
                                Add Music Data
                              </Link>
                            </button>
                          ) : (
                            <button className="text-sm font-semibold bg-white rounded-full px-3 py-2 text-black">
                              <Link to={`edit/${music._id}/preview`}>
                                Music Data Preview
                              </Link>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
