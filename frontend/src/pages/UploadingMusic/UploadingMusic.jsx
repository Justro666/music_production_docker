import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import SongUploadPng from '../../assets/images/songupload.png';
import DocumentUpload from '../../assets/images/documentUpload.png';
import BackLink from '../../components/Layouts/BackLink';
import { MdFileUpload } from 'react-icons/md';
import axios from 'axios';
import Loading from '../../sparepages/Loading';
import { useNavigate } from 'react-router-dom';
import SessionExpired from '../../components/SessionExpired';

const UploadingMusic = () => {
  const navigate = useNavigate();
  const [permission, setPermission] = useState('view');
  const [tokenExpired, setTokenExpired] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Uploading Music - Overstood';

    checkPermission();
  }, []);

  const [songRecordingName, setSongRecordingName] = useState('The Boys');
  const [songFile, setSongFile] = useState();
  const [documentFile, setDocumentFile] = useState();

  const checkPermission = async () => {
    const token = localStorage.getItem('token');
    try {
      const body = {
        page: 'upload_music',
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

  const handleSongRecordName = (e) => {
    setSongFile(e.target.files[0]);
    setSongRecordingName(e.target.files[0].name.split('.')[0]);
  };

  const onFileUpload = async () => {
    setLoading((prevState) => (prevState = true));
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();

      formData.append('name', songRecordingName);
      formData.append('files', documentFile);
      formData.append('music', songFile);

      const { data } = await axios.post('/music/upload_music', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      navigate('/productManager');

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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

      <div className="absolute p-10 space-y-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl">
        <div className="space-y-3">
          <p>Song Title</p>
          <div className="w-[800px] bg-secondaryGray text-white px-5 py-2 rounded-lg">
            <p>{songRecordingName}</p>
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="w-96">
            <p className="mb-3">Song Recordings</p>
            <label
              htmlFor="songRecord"
              className="py-5 bg-secondaryColor rounded-xl flex items-center justify-center space-x-4 cursor-pointer"
            >
              <div>
                <img src={SongUploadPng} alt="" className="w-16" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold">Drag and Drop your file here</p>
                <p className="font-thin">File supported: WAV/mp3</p>
                <p className="text-xl">Or</p>
                <div className="py-2 px-10 border-2 rounded-full border-opacity-50 text-xs border-[rgba(255,255,255,0.5)]">
                  Browse files
                </div>
              </div>
            </label>
            <input
              type="file"
              id="songRecord"
              className="hidden"
              accept="audio/*"
              onChange={handleSongRecordName}
            />
          </div>

          <div className="w-96">
            <p className="mb-3">Document</p>
            <label
              htmlFor="documents"
              className="py-5 bg-secondaryColor rounded-xl flex items-center justify-center space-x-4 cursor-pointer"
            >
              <div>
                <img src={DocumentUpload} alt="" className="w-16" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold">Drag and Drop your file here</p>
                <p className="font-thin">File supported: pdf/txt/doc</p>
                <p className="text-xl">Or</p>
                <div className="py-2 px-10 border-2 rounded-full border-opacity-50 text-xs border-[rgba(255,255,255,0.5)]">
                  Browse files
                </div>
              </div>
            </label>
            <input
              type="file"
              id="documents"
              className="hidden"
              accept=".pdf, .txt, .png, .jpeg"
              onChange={(e) => setDocumentFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-10 flex w-full justify-between items-center">
        <BackLink to={'/'} />

        <button
          onClick={() => onFileUpload()}
          className="bg-primaryColor px-5 py-2 rounded-md flex space-x-3 items-center"
        >
          <MdFileUpload />
          <span>Upload</span>
        </button>
      </div>
    </div>
  );
};

export default UploadingMusic;
