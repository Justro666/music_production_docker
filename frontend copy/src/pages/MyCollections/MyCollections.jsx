import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import { BiSearch } from 'react-icons/bi';
import SongRecordings from './SongRecordings';
import ArtWorks from './ArtWorks';
import Projects from './Projects';
import axios from 'axios';
import Loading from '../../sparepages/Loading';
import SessionExpired from '../../components/SessionExpired';
import { useNavigate } from 'react-router-dom';

const MyCollections = () => {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);

  const [permission, setPermission] = useState('view');
  const [tokenExpired, setTokenExpired] = useState(false);

  const navigate = useNavigate();

  const checkPermission = async () => {
    const token = localStorage.getItem('token');
    try {
      const body = {
        page: 'songrecording_collection',
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

  const showShowRecordings = () => {
    setStep(1);
  };

  const showArtwork = () => {
    setStep(2);
  };

  const showProjects = () => {
    setStep(3);
  };

  useEffect(() => {
    document.title = 'Cloud Storage - Overstood';

    checkPermission();
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

      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <button
            className={`w-36 py-2 rounded-tl-md rounded-bl-md hover:bg-secondaryColor hover:text-white ${
              step === 1
                ? 'bg-secondaryColor text-white'
                : 'bg-white text-black'
            }`}
            onClick={showShowRecordings}
          >
            Song Recording
          </button>
          <button
            className={`w-36 py-2 hover:bg-secondaryColor hover:text-white ${
              step === 2
                ? 'bg-secondaryColor text-white'
                : 'bg-white text-black'
            }`}
            onClick={showArtwork}
          >
            Artwork
          </button>
          <button
            className={`w-36 py-2 rounded-tr-md rounded-br-md hover:bg-secondaryColor hover:text-white ${
              step === 3
                ? 'bg-secondaryColor text-white'
                : 'bg-white text-black'
            }`}
            onClick={showProjects}
          >
            Projects
          </button>
        </div>

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

      {step === 1 && <SongRecordings setLoading={setLoading} search={search} />}
      {step === 2 && <ArtWorks setLoading={setLoading} search={search} />}
      {step === 3 && <Projects setLoading={setLoading} search={search} />}
    </div>
  );
};

export default MyCollections;
