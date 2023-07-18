import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import BackLink from '../../components/Layouts/BackLink';
import {
  AiFillQuestionCircle,
  AiFillSave,
  AiOutlineLeft,
} from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../sparepages/Loading';
import SideAlert from '../../components/SideAlert';

const AddMusicData = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [progressBar, setProgressBar] = useState(0);
  const [progressDiv, setProgressDiv] = useState(false);
  const [photoModel, setPhotoModel] = useState(false);

  let [cataLogId, setCataLogId] = useState('');
  let [artWorkId, setArtWorkId] = useState('');
  const [selectedArtWork, setSelectedArtWork] = useState('');
  const [primaryArtist, setPrimaryArtist] = useState('');
  const [featuredArtists, setFeaturedArtists] = useState('');
  const [composers, setComposers] = useState('');
  const [producers, setProducers] = useState('');
  const [primaryTitle, setPrimaryTitle] = useState('');
  const [yearOfRelease, setYearOfRelease] = useState('');
  const [duration, setDuration] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [iswc, setIswc] = useState('');
  const [publisherIpi, setPublisherIpi] = useState('');
  const [publisherName, setPublisherName] = useState('');
  const [collectShare, setCollectShare] = useState('');
  const [recordingTitle, setRecordingTitle] = useState('');
  const [recordingArtist, setRecordingArtist] = useState('');
  const [recordingIsrc, setRecordingIsrc] = useState('');
  const [label, setLabel] = useState('');

  const [sideAlert, setSideAlert] = useState(false);
  const [errorText, setErrorText] = useState(null);

  let [status, setStatus] = useState(0);

  let [artworks, setArtworks] = useState([]);
  let [cataLogs, setCataLogs] = useState([]);

  const nextHandler = () => {
    if (progressBar === 0) {
      setProgressBar('1/2');
      setProgressDiv(true);
    } else if (progressBar === '1/2') {
      setProgressBar('full');
    }
  };

  const backHandler = () => {
    if (progressBar === 'full') {
      setProgressBar('1/2');
    } else if (progressBar === '1/2') {
      setProgressBar(0);
      setProgressDiv(false);
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

      setArtworks((artworks = data.result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCatalogs = async () => {
    try {
      const token = localStorage.getItem('token');

      const { data } = await axios.get('/cat/userCata', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCataLogs((cataLogs = data.result.CataReq.data));
      setCataLogId((cataLogId = cataLogs[0].c1._id));

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArtworks();
    fetchCatalogs();
  }, []);

  const postMusicData = async () => {
    setLoading((prevState) => (prevState = true));

    try {
      const token = localStorage.getItem('token');

      const body = {
        c7: params.id,
        c6: artWorkId,
        c22: cataLogId,
        c2: primaryArtist,
        c3: featuredArtists,
        c4: composers,
        c5: producers,
        c8: primaryTitle,
        c9: yearOfRelease,
        c10: Number(duration),
        c11: albumTitle,
        c12: iswc,
        c21: Number(status),
      };

      publisherIpi !== '' && (body.c13 = publisherIpi);
      publisherName !== '' && (body.c14 = publisherName);
      collectShare !== '' && (body.c15 = collectShare);
      recordingTitle !== '' && (body.c16 = recordingTitle);
      recordingArtist !== '' && (body.c17 = recordingArtist);
      recordingIsrc !== '' && (body.c18 = recordingIsrc);
      label !== '' && (body.c19 = label);

      console.log(body);

      const { data } = await axios.post('/project/music_data', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      // console.log(data.result.error);

      const inputFields = {
        c7: 'Music Identification',
        c6: 'Artwork Identification',
        c22: 'Catalog Identification',
        c2: 'Primary Artist',
        c3: 'Featured Artist',
        c4: 'Composer',
        c5: 'Producer',
        c8: 'Primary Title',
        c9: 'Year of release',
        c10: 'Duration',
        c11: 'Album Title',
      };

      if (!data.result.error) {
        navigate(`/productManager/edit/${params.id}/preview`);
      }

      let error = data.result.error.split(' ');
      let errorCode = data.result.error.split(' ')[0];
      error.shift();

      toShowErrorMessage(
        inputFields[errorCode.replaceAll('"', '')] + ' ' + error.join(' ')
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toShowErrorMessage = (text) => {
    setSideAlert(true);
    setTimeout(() => {
      setSideAlert(false);
    }, 2000);
    setErrorText((prevState) => (prevState = text));
  };

  return (
    <div className="w-full h-full space-y-5 px-5 py-1">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      <div
        className={`fixed top-4 transition-all duration-700 ${
          sideAlert ? 'right-4' : '-right-full'
        }`}
      >
        <SideAlert name={errorText} />
      </div>

      {loading && (
        <div className="w-screen h-screen fixed top-0 left-0 z-10">
          <Loading />
        </div>
      )}

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
                  setArtWorkId((artWorkId = artwork._id));
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

      <div className="w-3/4 md:w-4/5 p-20 h-3/4 absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl flex flex-col space-y-8 items-center">
        <div className="w-3/4 bg-secondaryGray rounded-full h-3 relative">
          <div
            className={`bg-secondaryColor h-3 rounded-full transition-all duration-700 w-${progressBar} ${
              progressDiv ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>

          <div className="flex flex-col items-center space-y-3 absolute top-3/4 -translate-y-3/4 -left-10">
            <p>Artist Details</p>
            <div className="w-10 h-10 bg-secondaryColor rounded-full flex justify-center items-center text-white">
              <p>1</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3 absolute top-3/4 -translate-y-3/4 left-1/2 -translate-x-1/2">
            <p>Recording Details</p>
            <div
              className={`w-10 h-10 text-white rounded-full flex justify-center items-center transition-all duration-1000  ${
                progressBar === '1/2' || progressBar === 'full'
                  ? 'bg-secondaryColor '
                  : ' bg-secondaryGray '
              }`}
            >
              <p>2</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3 absolute top-3/4 -translate-y-3/4 -right-10">
            <p>Request Data</p>
            <div
              className={`w-10 h-10 rounded-full flex justify-center items-center text-white transition-all duration-1000 ${
                progressBar === 'full'
                  ? 'bg-secondaryColor'
                  : 'bg-secondaryGray'
              }`}
            >
              <p>3</p>
            </div>
          </div>
        </div>

        {progressBar === 0 && (
          <div className="w-full h-full flex flex-col items-center pt-5">
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

            <div className="flex flex-col space-y-2">
              <label htmlFor="">Catalog</label>
              <select
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={cataLogId}
                onChange={(e) => setCataLogId(e.target.value)}
              >
                {cataLogs.map((cataLog) => (
                  <option key={cataLog.c1._id} value={cataLog.c1._id}>
                    {cataLog.c1.c1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="">Primary Artist</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={primaryArtist}
                onChange={(e) => setPrimaryArtist(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="">Featured Artists</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={featuredArtists}
                onChange={(e) => setFeaturedArtists(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="">Composers</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={composers}
                onChange={(e) => setComposers(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="">Producers</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={producers}
                onChange={(e) => setProducers(e.target.value)}
              />
            </div>
          </div>
        )}

        {progressBar === '1/2' && (
          <div className="w-full h-full flex flex-col items-center pt-5">
            <div className="flex flex-col space-y-2">
              <label htmlFor="">Primary Title</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={primaryTitle}
                onChange={(e) => setPrimaryTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="">Year of Release</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={yearOfRelease}
                onChange={(e) => setYearOfRelease(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="">Duration</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="">Album Titles</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="">ISWC</label>
              <input
                type="text"
                className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                defaultValue={iswc}
                onChange={(e) => setIswc(e.target.value)}
              />
            </div>
          </div>
        )}

        {progressBar === 'full' && (
          <div className="w-full h-full flex pt-5">
            <div className="w-1/2 flex flex-col items-center">
              <div className="flex flex-col space-y-2">
                <label htmlFor="">Publisher IPI</label>
                <input
                  type="text"
                  className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                  defaultValue={publisherIpi}
                  onChange={(e) => setPublisherIpi(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="">Publisher Name</label>
                <input
                  type="text"
                  className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                  defaultValue={publisherName}
                  onChange={(e) => setPublisherName(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="">Collection Share</label>
                <input
                  type="text"
                  className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                  defaultValue={collectShare}
                  onChange={(e) => setCollectShare(e.target.value)}
                />
              </div>
            </div>

            <div className="w-1/2 flex flex-col items-center">
              <div className="flex flex-col space-y-2">
                <label htmlFor="">Recording Title</label>
                <input
                  type="text"
                  className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                  defaultValue={recordingTitle}
                  onChange={(e) => setRecordingTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="">Recording Artist</label>
                <input
                  type="text"
                  className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                  defaultValue={recordingArtist}
                  onChange={(e) => setRecordingArtist(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="">Recording ISRC</label>
                <input
                  type="text"
                  className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                  defaultValue={recordingIsrc}
                  onChange={(e) => setRecordingIsrc(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="">Label</label>
                <input
                  type="text"
                  className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
                  defaultValue={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {progressBar !== 'full' ? (
          <button
            className="bg-secondaryBlue text-white px-5 py-2 rounded-md absolute right-5 bottom-5"
            onClick={nextHandler}
          >
            <span>Next</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setStatus((status = 0));
              postMusicData();
            }}
            className="absolute right-5 bottom-5 py-2 px-4 bg-secondaryBlue rounded-lg flex items-center space-x-3"
          >
            <AiFillQuestionCircle />
            <span>Request to publish</span>
          </button>
        )}
      </div>

      <div className="absolute bottom-5 pr-16 flex w-full justify-between items-center">
        {!progressDiv ? (
          <BackLink to={'/productManager'} />
        ) : (
          <>
            <button
              className="flex items-center space-x-3 bg-white text-black px-4 rounded-lg"
              onClick={backHandler}
            >
              <AiOutlineLeft />
              <button className="py-2 text-black rounded-md">back</button>
            </button>

            {progressBar === 'full' && (
              <button
                className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
                onClick={() => {
                  setStatus((status = 1));
                  postMusicData();
                }}
              >
                <AiFillSave />
                <span>Save</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddMusicData;
