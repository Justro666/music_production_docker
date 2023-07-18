import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackLink from '../../components/Layouts/BackLink';
import { BiSearch } from 'react-icons/bi';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import { BsFillImageFill } from 'react-icons/bs';
import axios from 'axios';
import Loading from '../../sparepages/Loading';
import SessionExpired from '../../components/SessionExpired';

const Artworks = () => {
  let [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [permission, setPermission] = useState('view');
  const [tokenExpired, setTokenExpired] = useState(false);
  const navigate = useNavigate();

  const checkPermission = async () => {
    const token = localStorage.getItem('token');
    try {
      const body = {
        page: 'art_work',
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

  const fetchArtworks = async () => {
    try {
      const token = localStorage.getItem('token');

      const { data } = await axios.get('/cloud/artwork_collection', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      // console.log(data);
      setArtworks((artworks = data.result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = 'Artworks - Overstood';

    checkPermission();
    fetchArtworks();
  }, []);

  return (
    <div className="w-full h-full p-5">
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
        {/* <div className="flex items-center space-x-5">
          <p>Sort By</p>
          <select
            name="cars"
            id="cars"
            className="px-5 py-1 rounded-md bg-secondaryBg outline-none"
          >
            <option>Name</option>
            <option>Name</option>
            <option>Name</option>
            <option>Name</option>
            <option>Name</option>
          </select>
        </div> */}
        <div className="flex items-center justify-between space-x-3 bg-white px-5 py-3 rounded-full text-black w-96">
          <input
            type="text"
            placeholder="Search Here"
            className="focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <BiSearch className="text-xl" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-5 place-items-center">
        {artworks
          ?.filter((artwork) => {
            return search.toLowerCase() === ''
              ? artwork
              : artwork.c1.toLowerCase().includes(search);
          })
          .map((artwork) => (
            <Link
              key={artwork._id}
              to={`edit/${artwork._id}`}
              className="w-60 flex flex-col items-center space-y-3"
            >
              <div className="w-48">
                <img src={artwork.c3} alt="artwork" />
              </div>
              <p>{artwork.c1}</p>
            </Link>
          ))}
      </div>

      <div className="absolute bottom-5 pr-10 flex w-full justify-between items-center">
        <BackLink to={'/'} />

        <Link
          to={'designArtwork'}
          className="bg-secondaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
        >
          <BsFillImageFill />
          <span>Upload</span>
        </Link>
      </div>
    </div>
  );
};

export default Artworks;
