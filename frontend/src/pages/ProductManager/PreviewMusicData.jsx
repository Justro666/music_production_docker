import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import { useNavigate, useParams } from 'react-router-dom';
import BackLink from '../../components/Layouts/BackLink';
import axios from 'axios';
import moment from 'moment';
import { HiDownload } from 'react-icons/hi';
import Loading from '../../sparepages/Loading';
import html2pdf from 'html2pdf.js';

const PreviewMusicData = () => {
  const params = useParams();

  const [artWorkSrc, setArtWorkSrc] = useState('');
  const [primaryArtist, setPrimaryArtist] = useState('');
  const [primaryTitle, setPrimaryTitle] = useState('');
  const [featuredArtists, setFeaturedArtists] = useState('');
  const [composers, setComposers] = useState('');
  const [producers, setProducers] = useState('');
  const [songId, setSongId] = useState('');
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
  const [status, setStatus] = useState(1);
  const [projectId, setProjectId] = useState('');
  const [artId, setArtId] = useState('');

  const [loading, setLoading] = useState(true);
  let [startPrint, setStartPrint] = useState(false);

  const navigate = useNavigate();

  const fetchMusicData = async () => {
    try {
      const token = localStorage.getItem('token');

      const body = {
        songId: params.id,
      };

      console.log('OK');
      const { data } = await axios.post('/project/music_data_preview', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);

      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      setArtWorkSrc((prevState) => (prevState = data.result.data[0].c6.c3));
      setArtId((prevState) => (prevState = data.result.data[0].c6._id));
      setPrimaryArtist((prevState) => (prevState = data.result.data[0].c2));
      setPrimaryTitle((prevState) => (prevState = data.result.data[0].c8));
      setFeaturedArtists((prevState) => (prevState = data.result.data[0].c3));
      setComposers((prevState) => (prevState = data.result.data[0].c4));
      setProducers((prevState) => (prevState = data.result.data[0].c5));
      setSongId((prevState) => (prevState = data.result.data[0].c7));
      setYearOfRelease((prevState) => (prevState = data.result.data[0].c9));
      setDuration(
        (prevState) => (prevState = data.result.data[0].c10.$numberDecimal)
      );
      setAlbumTitle((prevState) => (prevState = data.result.data[0].c11));
      setIswc((prevState) => (prevState = data.result.data[0].c12));
      setPublisherIpi((prevState) => (prevState = data.result.data[0].c13));
      setPublisherName((prevState) => (prevState = data.result.data[0].c14));
      setCollectShare((prevState) => (prevState = data.result.data[0].c15));
      setRecordingTitle((prevState) => (prevState = data.result.data[0].c16));
      setRecordingArtist((prevState) => (prevState = data.result.data[0].c17));
      setRecordingIsrc((prevState) => (prevState = data.result.data[0].c18));
      setLabel((prevState) => (prevState = data.result.data[0].c19));
      setStatus((prevState) => (prevState = data.result.data[0].c21));
      setProjectId((prevState) => (prevState = data.result.data[0]._id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMusicData();
  }, []);

  useEffect(() => {
    fetchArtwork(artId);

    return () => {};
  }, [artId]);

  const requestToAdmin = async () => {
    setLoading((prevState) => (prevState = true));
    try {
      const token = localStorage.getItem('token');

      const body = {
        songId: songId,
        projId: projectId,
        status: 0,
      };

      const { data } = await axios.patch('/project/music_data', body, {
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

  const downloadPdf = () => {
    setStartPrint((startPrint = true));

    setTimeout(() => {
      var element = document.getElementById('card');

      // console.log(element);
      var opt = {
        margin: 0.3,
        filename: new Date().getTime() + '.pdf',
        image: {
          type: 'jpeg',
          quality: 1,
        },
        html2canvas: {
          scale: 4,
          dpi: 72,
          letterRendering: true,
        },
        jsPDF: {
          unit: 'mm',
          format: 'A4',
          orientation: 'landscape',
        },
      };
      html2pdf().from(element).set(opt).save();
      setStartPrint((startPrint = false));
    }, 0);
  };

  const downloadZip = async () => {
    try {
      const token = localStorage.getItem('token');
      // const body = {
      //   musicId: songId,
      //   artId: artId,
      // };

      const formData = new FormData();
      // formData.append('file', blob, 'Music Data.pdf');
      formData.append('musicId', songId);
      formData.append('artId', artId);
      const data = await axios.patch('/project/music_data_preview', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      console.log(data.data);
      const url = window.URL.createObjectURL(new Blob([data.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'zippedFiles.zip');
      document.body.appendChild(link);
      link.click();

      // console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArtwork = async (artId) => {
    try {
      const token = localStorage.getItem('token');
      const body = {
        artId: artId,
      };
      const data = await axios.delete('/project/music_data_preview', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      });
      setArtWorkSrc(
        (prevState) =>
          (prevState = `data:${data.data.contentType};base64,${data.data.image}`)
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full px-5 py-5" id="card">
      <img
        src={BackgroundImageZZ}
        className={`top-0 left-0 w-full h-full bg-center -z-10 ${
          startPrint ? 'hidden' : 'absolute'
        }`}
        alt="background"
      />

      {loading && (
        <div className="w-screen h-screen fixed top-0 left-0 z-10">
          <Loading />
        </div>
      )}

      <div className="w-3/4 md:w-4/5 py-5 m-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-xl flex flex-col space-y-8 items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden flex justify-center items-center">
          <img src={artWorkSrc} alt="" className="w-full object-cover" />
        </div>

        <div className="w-full flex justify-evenly">
          <div className="space-y-4 px-10">
            <div className="w-full flex justify-center items-center">
              <div
                className={`w-10 h-10 rounded-full border flex justify-center items-center ${
                  startPrint ? 'pb-6' : ''
                } font-bold text-xl`}
              >
                i
              </div>
            </div>

            <div className="flex w-full">
              <p className="w-56">Primary Artist</p>
              <p className="w-16">-</p>
              <p>{primaryArtist}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Primary Titles</p>
              <p className="w-16">-</p>
              <p className="w-36">{primaryTitle}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Featured Artists</p>
              <p className="w-16">-</p>
              <p>{featuredArtists}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Composers</p>
              <p className="w-16">-</p>
              <p>{composers}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Producers</p>
              <p className="w-16">-</p>
              <p>{producers}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Year of Release</p>
              <p className="w-16">-</p>
              <p>{moment(yearOfRelease).calendar()}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Duration</p>
              <p className="w-16">-</p>
              <p>{duration}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Album Titles</p>
              <p className="w-16">-</p>
              <p className="w-36">{albumTitle}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">ISWC</p>
              <p className="w-16">-</p>
              <p>{iswc}</p>
            </div>
          </div>

          <div className="bg-white h-96 w-0.5 absolute left-1/2 -translate-x-1/2"></div>

          <div className="space-y-4 px-10">
            <div className="w-full flex justify-center items-center">
              <div
                className={`w-10 h-10 rounded-full border flex justify-center items-center ${
                  startPrint ? 'pb-6' : ''
                } font-bold text-xl`}
              >
                c
              </div>
            </div>
            <div className="flex w-full ">
              <p className="w-56">Publisher IPI</p>
              <p className="w-16">-</p>
              <p>{publisherIpi}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Publisher Name</p>
              <p className="w-16">-</p>
              <p>{publisherName}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Collection Share</p>
              <p className="w-16">-</p>
              <p>{collectShare}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Recording Titles</p>
              <p className="w-16">-</p>
              <p>{recordingTitle}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Recording Artist</p>
              <p className="w-16">-</p>
              <p>{recordingArtist}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Recording ISRC</p>
              <p className="w-16">-</p>
              <p>{recordingIsrc}</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Label</p>
              <p className="w-16">-</p>
              <p>{label}</p>
            </div>
          </div>
        </div>

        {startPrint && (
          <div className="flex w-full justify-end pt-24 -pr-20">
            Power by Ex;braiN Technology
          </div>
        )}

        {(status === 0 || status === 1) && (
          <>
            {status === 1
              ? !startPrint && (
                  <button
                    onClick={() => requestToAdmin()}
                    className="absolute bottom-5 right-5 bg-primaryColor px-5 py-2 rounded-lg"
                  >
                    Request to admin
                  </button>
                )
              : !startPrint && (
                  <button className="absolute bottom-5 right-5 bg-primaryColor px-5 py-2 rounded-lg">
                    Request pending
                  </button>
                )}
          </>
        )}
      </div>

      {!startPrint && (
        <div className="absolute bottom-5 pr-16 flex w-full justify-between items-center">
          <BackLink
            to={`/productManager${
              status === 0 || status === 2 ? '' : '/edit/' + params.id
            }`}
          />

          {/* {status === 2 && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => downloadZip()}
                className="bg-primaryColor px-5 py-2 rounded-lg flex items-center space-x-2"
              >
                <HiDownload />
                <p>Download as zip</p>
              </button>
            </div>
          )} */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => downloadZip()}
              className="bg-primaryColor px-5 py-2 rounded-lg flex items-center space-x-2"
            >
              <HiDownload />
              <p>Download as zip</p>
            </button>
          </div>

          <button
            onClick={() => downloadPdf()}
            className="bg-primaryColor px-5 py-2 rounded-lg flex items-center space-x-2"
          >
            <HiDownload />
            <p>Export as pdf</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewMusicData;
