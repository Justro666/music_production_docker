import React, { useEffect, useState } from 'react';
import BackLink from '../../components/Layouts/BackLink';
import { AiFillSave } from 'react-icons/ai';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import axios from 'axios';
import Loading from '../../sparepages/Loading';
import SideAlert from '../../components/SideAlert';
import { useNavigate } from 'react-router-dom';
import SessionExpired from '../../components/SessionExpired';

const DesignArtwork = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [artWorkName, setArtWorkName] = useState('');
  const [artWorkDesc, setArtWorkDesc] = useState('');

  const [loading, setLoading] = useState(false);
  const [sideAlert, setSideAlert] = useState(false);

  const [permission, setPermission] = useState('view');
  const [tokenExpired, setTokenExpired] = useState(false);

  const navigate = useNavigate();

  const reader = new FileReader();

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

  const handlePreviewImage = (element) => {
    if (!element.target.files[0]) return;
    reader.readAsDataURL(element.target.files[0]);
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const { height, width } = image;
        if (!(height >= 1500 && width >= 1500 && height === width)) {
          setImgSrc(null);
          setPhoto(null);
          setShowImage(false);
          setImgError(true);
          return false;
        }
        setImgError(false);
        setShowImage(true);
        setImgSrc(URL.createObjectURL(element.target.files[0]));
        setPhoto(element.target.files[0]);
        return true;
      };
    };
  };

  const onFileUpload = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();

      formData.append('photo', photo);
      formData.append('c1', artWorkName);
      formData.append('c2', artWorkDesc);

      const { data } = await axios.post('/art/upload_artwork', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.result.error?.includes('Token Expire')) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');

        setSideAlert(true);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      navigate('/artworks');

      setImgSrc(null);
      setPhoto(null);
      setShowImage(false);
      setLoading(false);
      console.log(data.result.msg);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkPermission();
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
        <div className="w-screen h-screen absolute top-0 left-0 z-10">
          <Loading />
        </div>
      )}

      <div
        className={`fixed top-4 transition-all duration-700 ${
          sideAlert ? 'right-4' : '-right-full'
        }`}
      >
        <SideAlert name="Token expired. Please login again!" />
      </div>

      <p className="text-3xl">Create Artwork</p>

      <div className="flex justify-evenly mt-20">
        <div className="flex flex-col items-center space-y-5 p-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl">
          <label
            htmlFor="artworkImage"
            className="w-96 h-96 bg-white rounded-md overflow-hidden cursor-pointer flex justify-center items-center"
          >
            {showImage && (
              <img
                src={imgSrc}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
            {imgError && (
              <p className="text-secondaryRed font-bold px-5">
                Image Size must be greater than or equal to 1500 x 1500 (pixels)
                and also must be square.
              </p>
            )}
          </label>

          <input
            type="file"
            id="artworkImage"
            className="hidden"
            accept="image/*"
            onChange={handlePreviewImage}
          />
        </div>

        <div className="flex flex-col space-y-5 p-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl">
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Artwork's Name</label>
            <input
              type="text"
              className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
              onChange={(e) => setArtWorkName(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              className="bg-secondaryBg rounded-xl p-2 outline-none w-96 h-44 resize-none"
              onChange={(e) => setArtWorkDesc(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-10 flex w-full justify-between items-center">
        <BackLink to={'/artworks'} />

        <button
          onClick={onFileUpload}
          className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
        >
          <AiFillSave />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default DesignArtwork;
