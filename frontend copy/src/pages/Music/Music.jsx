import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import MusicData from '../../assets/images/musicdata.png';
import axios from 'axios';

const Music = () => {
  const [catalogId, setCatalogId] = useState('');
  const [cataLogs, setCataLogs] = useState([]);
  const [catalogMusics, setCatalogMusics] = useState([]);

  const [musicModal, setMusicModal] = useState(false);

  const fetchFullCatalogs = async () => {
    try {
      const token = localStorage.getItem('token');

      const { data } = await axios.get('/cat/fullUserCatalog', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(data.result.CataReq.data[0].c1._id);

      // console.log(data);

      if (data) {
        setCataLogs((cataLogs) => (cataLogs = data.result.CataReq.data));

        setCatalogId(
          (catalogId) => (catalogId = data.result.CataReq.data[0].c1._id)
        );
      }

      // console.log(catalogId);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCatalogMusic = async (catalogId) => {
    try {
      const token = localStorage.getItem('token');

      const body = {
        catId: catalogId,
      };

      const { data } = await axios.post('/cat/cataMusic', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setCatalogMusics((catalogMusics) => (catalogMusics = data.result.data));
      }

      // console.log(data.result.CataReq.data[0].c1._id);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = 'Music - Overstood';

    fetchFullCatalogs();
  }, []);

  useEffect(() => {
    catalogId !== '' && fetchCatalogMusic(catalogId);
  }, [catalogId]);

  return (
    <div className="w-full h-full px-5 py-5">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      {/* Music Modal */}
      {musicModal && (
        <div
          className="w-screen h-screen absolute -top-24 left-0 z-40"
          onClick={() => {
            setMusicModal(false);
          }}
        ></div>
      )}

      {musicModal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-24 flex flex-col space-y-4 items-center rounded-xl bg-white bg-opacity-10 backdrop-blur-lg z-50">
          <select
            className=" bg-secondaryColor rounded-xl p-2 outline-none w-36 absolute top-10 right-10"
            defaultValue={catalogId}
            onChange={(e) => {
              setCatalogId(e.target.value);
            }}
          >
            {cataLogs?.map((cataLog) => (
              <option key={cataLog.c1._id} value={cataLog.c1._id}>
                {cataLog.c1.c1}
              </option>
            ))}
          </select>

          <div className="flex flex-col items-center space-y-6">
            <img src={MusicData} alt="" className="w-28" />

            <div className="text-center">
              <p className="text-xl font-semibold">Terror Bass</p>
              <p className="text-xs font-light">Lwin Ko Zin Latt</p>
            </div>
          </div>

          <div className="w-full space-y-8">
            <div className="flex w-full ">
              <p className="w-56">ISNI</p>
              <p className="w-16">-</p>
              <p>11121234123</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">CAE/IPI</p>
              <p className="w-16">-</p>
              <p>11121234123</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">ISRC</p>
              <p className="w-16">-</p>
              <p>US-ABC-12-34567</p>
            </div>

            <div className="flex w-full">
              <p className="w-56">Type</p>
              <p className="w-16">-</p>
              <p>Label</p>
            </div>
          </div>
        </div>
      )}
      {/* Music Modal */}

      <div className="w-full">
        <button
          onClick={() => {
            setMusicModal(true);
          }}
          className="px-3 py-2 bg-darkBlue w-28 flex justify-center rounded-tl-lg"
        >
          <img src={MusicData} alt="" className="w-20" />
        </button>
      </div>

      <div className="w-full h-[550px] 2xl:h-[700px] bg-white bg-opacity-10 backdrop-blur-lg rounded-r-lg rounded-bl-lg p-5 border-2 border-secondaryGray">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="h-[500px] 2xl:h-[650px] overflow-y-auto customScrollY pr-3">
                <table
                  className="min-w-full text-left text-sm font-light rounded-md border-spacing-y-2 border-separate"
                  cellSpacing={12}
                >
                  <tbody>
                    {catalogMusics?.map((catalogMusic) => (
                      <tr
                        key={catalogMusic._id}
                        className="py-2 bg-black hover:bg-secondaryColor cursor-pointer bg-opacity-10 backdrop-blur-lg"
                      >
                        <td className="whitespace-nowrap px-6 py-2 rounded-tl-xl rounded-bl-xl">
                          <img
                            src={catalogMusic.c6.c3}
                            alt=""
                            className="w-12 h-12 rounded-full"
                          />
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {catalogMusic.c2}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {catalogMusic.c10.$numberDecimal.split('.').join(':')}{' '}
                          mins
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {catalogMusic.c4.split(',').length} Contributors
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {catalogMusic.c12 ? catalogMusic.c12 : 'No ISWC Code'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {catalogMusic.c9}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {catalogMusic.c11}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 rounded-tr-xl rounded-br-xl">
                          20/12/2022
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
    </div>
  );
};

export default Music;
