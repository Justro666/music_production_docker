import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import {
  AiFillQuestionCircle,
  AiFillSave,
  AiOutlineWarning,
} from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../sparepages/Loading';

const Identity = () => {
  const [artworks, setArtworks] = useState([]);
  const [artWorkId, setArtWorkId] = useState('');
  const [selectedArtWork, setSelectedArtWork] = useState('');
  const [photoModel, setPhotoModel] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bandName, setBandName] = useState('');
  const [isni, setIsni] = useState('');
  const [caeIpi, setCaeIpi] = useState('');
  const [isrc, setIsrc] = useState('');
  const [type, setType] = useState(0);
  const [status, setStatus] = useState(0);

  const navigate = useNavigate();

  const fetchArtworks = async () => {
    try {
      const token = localStorage.getItem('token');

      const { data } = await axios.get('/cloud/artwork_collection', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(data);

      setArtworks((artworks) => (artworks = data.result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadIdentity = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const body = {
        c1: bandName,
        c2: artWorkId,
        c6: type,
        c7: status,
      };

      isni !== '' && (body.c3 = isni);
      caeIpi !== '' && (body.c4 = caeIpi);
      isrc !== '' && (body.c5 = isrc);

      const { data } = await axios.post('/team/identity', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(data.result.msg);

      if (data.result.msg.includes('Successful')) {
        setLoading(false);
        navigate('/profile/previewIdentity');
      }

      // console.log(body);

      // setArtworks((artworks) => (artworks = data.result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      fetchArtworks();
    };
  }, []);

  return (
    <div className="w-full h-full space-y-5 px-5 py-1">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      {/* photo Modal */}
      {photoModel && (
        <div
          className="w-screen h-screen absolute -top-24 left-0 z-40"
          onClick={() => {
            setPhotoModel(false);
          }}
        ></div>
      )}

      {photoModel && (
        <div className="absolute h-[600px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 p-10 rounded-xl bg-black bg-opacity-10 backdrop-blur-lg z-50">
          <p className="mb-5 text-xl font-bold">Choose From Workspace</p>

          <div className="grid grid-cols-3 gap-5 h-[470px] overflow-y-auto customScrollY pr-3">
            {artworks.map((artwork) => (
              <div
                key={artwork._id}
                className="text-center space-y-3 cursor-pointer"
                onClick={() => {
                  setArtWorkId((artWorkId) => (artWorkId = artwork._id));
                  setPhotoModel(false);
                  setSelectedArtWork(artwork.c3);
                }}
              >
                <img src={artwork.c3} alt="artwork" />
                <p>{artwork.c1}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* photo Modal */}

      {/* Confirm Box */}
      {confirmBox && (
        <div
          className="absolute top-0 left-0 w-screen h-screen z-40"
          onClick={() => {
            setConfirmBox(false);
          }}
        ></div>
      )}

      {confirmBox && (
        <div className="absolute w-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-xl bg-white z-50 text-black text-center">
          <div className="w-full flex justify-center text-7xl text-tertiary">
            <AiOutlineWarning />
          </div>
          <p className="my-3 text-3xl text-tertiary">Warning!</p>
          <p>
            You can no longer edit after save . <br />
            Are you Sure ?
          </p>
          <div className="w-full flex items-center justify-between mt-10 px-28">
            <button
              onClick={() => setConfirmBox(false)}
              className="px-10 py-3 rounded-lg bg-[rgba(0,0,0,0.2)]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setConfirmBox(false);
                uploadIdentity();
              }}
              className="px-10 py-3 rounded-lg bg-tertiary text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Confirm Box */}

      {loading && (
        <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-50">
          <Loading />
        </div>
      )}

      <div className="w-full flex flex-col items-center absolute top-1/2 left-0 -translate-y-1/2">
        <div className="flex flex-col w-2/3 py-10 rounded-lg items-center bg-white bg-opacity-10 backdrop-blur-lg">
          <button
            className="w-20 h-20 flex justify-center items-center rounded-full bg-white text-black text-3xl overflow-hidden"
            onClick={() => setPhotoModel(true)}
          >
            {artWorkId === '' ? (
              <BiImageAdd />
            ) : (
              <img src={selectedArtWork} alt="" />
            )}
          </button>

          <div className="flex flex-col items-center relative space-y-2">
            <div className="flex flex-col space-y-2 w-[500px]">
              <label htmlFor="">Band Name</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
                onChange={(e) => setBandName(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2 w-[500px]">
              <label htmlFor="">ISNI</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
                onChange={(e) => setIsni(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2 w-[500px]">
              <label htmlFor="">CAE/IPI</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
                onChange={(e) => setCaeIpi(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2 w-[500px]">
              <label htmlFor="">ISRC</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
                onChange={(e) => setIsrc(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2 w-[500px]">
              <label htmlFor="">Type</label>
              <select
                className="bg-secondaryBg rounded-xl p-2 outline-none w-full"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="0">band</option>
                <option value="1">duo/trio</option>
                <option value="2">label</option>
                <option value="3">publish entity</option>
              </select>
            </div>

            <div className="w-full flex justify-end pt-10">
              <button
                onClick={() => {
                  setStatus((prev) => (prev = 0));
                  setConfirmBox(true);
                }}
                className="py-2 px-4 bg-secondaryBlue rounded-lg flex items-center space-x-3"
              >
                <span>Ask to admin</span>
                <AiFillQuestionCircle />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-16 flex w-full justify-end items-center">
        <button
          onClick={() => {
            setStatus((prev) => (prev = 1));
            setConfirmBox(true);
          }}
          className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
        >
          <AiFillSave />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default Identity;
