import React, { useEffect, useState } from 'react';
import { IoMdDownload } from 'react-icons/io';
import { BsFillTrashFill } from 'react-icons/bs';
import moment from 'moment';
import axios from 'axios';

const ArtWorks = ({ setLoading, search }) => {
  let [artworks, setArtworks] = useState([]);

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

      console.log(data);
      setArtworks((artworks = data.result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const downloadArtwork = async (artId) => {
    setLoading((prevState) => (prevState = true));
    try {
      const token = localStorage.getItem('token');
      const mimeToExtension = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/bmp': 'bmp',
        'image/webp': 'webp',
        'image/tiff': 'tiff',
        'image/svg+xml': 'svg',
        'image/x-icon': 'ico',
        'image/vnd.adobe.photoshop': 'psd',
        'image/heic': 'heic',
        'image/heif': 'heif',
      };
      const body = {
        artId: artId,
      };
      const data = await axios.post('/cloud/artwork_collection', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      const url = window.URL.createObjectURL(new Blob([data.data]));
      const contentDisposition = data.headers['content-disposition'];
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].trim()
        : 'file';
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        fileName + '.' + mimeToExtension[data.headers['content-type']]
      );
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArtwork = async (artId) => {
    setLoading((prevState) => (prevState = true));

    try {
      const token = localStorage.getItem('token');

      const body = {
        artId: artId,
      };

      const { data } = await axios.delete('/cloud/artwork_collection', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      });

      fetchArtworks();

      if (data) {
        setLoading((prevState) => (prevState = false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="h-[550px] 2xl:h-[700px] overflow-y-auto customScrollY pr-3">
            <table
              className="min-w-full text-left text-sm font-light rounded-md border-spacing-y-2 border-separate"
              cellSpacing={12}
            >
              <tbody>
                {artworks
                  .filter((artwork) => {
                    return search.toLowerCase() === ''
                      ? artwork
                      : artwork.c1.toLowerCase().includes(search);
                  })
                  .map((artwork) => (
                    <tr
                      key={artwork._id}
                      className="py-2 bg-white hover:bg-secondaryColor cursor-pointer bg-opacity-10 backdrop-blur-lg"
                    >
                      <td className="whitespace-nowrap px-6 py-2  rounded-tl-xl rounded-bl-xl">
                        <img src={artwork.c3} alt="" className="w-12" />
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {artwork.c1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {artwork.c2}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {moment(artwork.updatedAt).calendar()}
                      </td>
                      <td className="whitespace-nowrap py-2">
                        <button
                          onClick={() => downloadArtwork(artwork._id)}
                          className="text-3xl text-white font-semibold"
                        >
                          <IoMdDownload />
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-2 rounded-tr-xl rounded-br-xl">
                        <button
                          onClick={() => deleteArtwork(artwork._id)}
                          className="text-3xl text-secondaryRed"
                        >
                          <BsFillTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtWorks;
