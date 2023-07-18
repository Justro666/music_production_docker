import React, { useEffect, useState } from 'react';
import gradientBackground from '../../assets/styles/GradientBackground.module.css';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SessionExpired from '../../components/SessionExpired';

const HomePage = () => {
  const [permission, setPermission] = useState('view');
  const [tokenExpired, setTokenExpired] = useState(false);

  const navigate = useNavigate();

  const checkPermission = async () => {
    const token = localStorage.getItem('token');
    try {
      const body = {
        page: 'dashboard',
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

  useEffect(() => {
    document.title = 'Dashboard - Overstood';

    checkPermission();
  }, []);

  return (
    <div className="w-full h-full p-5 px-20 pb-24">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      {tokenExpired && <SessionExpired />}

      <div className="w-full h-1/2 mb-10 bg-white rounded-lg bg-opacity-10 backdrop-blur-lg flex justify-center items-center">
        <p className="text-5xl">Welcome To Your Client Dashboard</p>
      </div>
      <div className="grid grid-cols-3 gap-10 h-1/2">
        <Link
          to={'uploadingMusic'}
          className={`flex justify-center h-3/4 items-center rounded-md relative overflow-hidden ${gradientBackground.gradientBackgroundOne}`}
        >
          <div>
            <p className="text-center text-4xl font-bold">
              Upload <br /> Your <br /> Song Recordings
            </p>
          </div>
        </Link>

        <Link
          to={'artworks'}
          className={`flex justify-center h-3/4 items-center rounded-md relative overflow-hidden ${gradientBackground.gradientBackgroundOne}`}
        >
          <div>
            <p className="text-center text-4xl font-bold">
              Upload <br /> Your <br /> Artworks
            </p>
          </div>
        </Link>

        <Link
          to={'mastering'}
          className={`flex justify-center h-3/4 items-center rounded-md relative overflow-hidden ${gradientBackground.gradientBackgroundOne}`}
        >
          <div>
            <p className="text-center text-4xl font-bold">
              Mastering <br /> Your <br /> Recordings
            </p>
          </div>
        </Link>
      </div>

      {/* <Link to={'projects'}
        className={`flex justify-center items-center rounded-md relative overflow-hidden ${gradientBackground.gradientBackgroundOne}`}
        onMouseOver={showMasterBg}
        onMouseOut={hideMasterBg}
      >
        <img
          src={MasteringBg}
          className={`w-full h-full absolute top-0 bg-center transition-all duration-700 ${masteringBg ? 'translate-y-0' : '-translate-y-full'}`}
          alt=""
        />
        <p className={`text-center text-4xl font-bold z-10 transition-all duration-700 ${masteringBg ? 'text-white' : 'text-black'}`}>
          Create <br /> New <br /> Project
        </p>
      </Link>

      <Link to={'artworks'}
        className={`flex justify-center items-center rounded-md relative overflow-hidden ${gradientBackground.gradientBackgroundOne}`}
        onMouseOver={showArtWorkBg}
        onMouseOut={hideArtWorkBg}
      >
        <img
          src={MasteringBg}
          className={`w-full h-full absolute top-0 bg-center transition-all duration-700 ${artWorkBg ? 'translate-y-0' : 'translate-y-full'}`}
          alt=""
        />
        <p className={`text-center text-4xl font-bold z-10 transition-all duration-700 ${artWorkBg ? 'text-white' : 'text-black'}`}>
          Create <br /> your <br /> Artworks
        </p>
      </Link>

      <Link to={'documents'}
        className={`flex justify-center items-center rounded-md relative overflow-hidden ${gradientBackground.gradientBackgroundOne}`}
        onMouseOver={showCopyRightBg}
        onMouseOut={hideCopyRightBg}
      >
        <img
          src={MasteringBg}
          className={`w-full h-full absolute top-0 bg-center transition-all duration-700 ${copyRightBg ? 'translate-y-0' : '-translate-y-full'}`}
          alt=""
        />
        <p className={`text-center text-4xl font-bold z-10 transition-all duration-700 ${copyRightBg ? 'text-white' : 'text-black'}`}>
          Write <br /> your <br /> Documents
        </p>
      </Link>

      <Link to={'mastering'}
        className={`flex justify-center items-center rounded-md relative overflow-hidden ${gradientBackground.gradientBackgroundOne}`}
        onMouseOver={showMetaDataBg}
        onMouseOut={hideMetaDataBg}
      >
        <img
          src={MasteringBg}
          className={`w-full h-full absolute top-0 bg-center transition-all duration-700 ${metaDataBg ? 'translate-y-0' : 'translate-y-full'}`}
          alt=""
        />
        <p className={`text-center text-4xl font-bold z-10 transition-all duration-700 ${metaDataBg ? 'text-white' : 'text-black'}`}>
          Mastering <br /> your <br /> Song
        </p>
      </Link> */}
    </div>
  );
};

export default HomePage;
