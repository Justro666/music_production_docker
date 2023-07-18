import React, { useState } from 'react';
import CatalogPng from '../../assets/images/catalog.png';
import SongsList from '../../components/Catalog/SongsList';
import ArtworksList from '../../components/Catalog/ArtworksList';
import SongsListPopUp from '../../components/Catalog/SongsListPopUp';
import SongsRequestList from '../../components/Catalog/SongsRequestList';

const Catalog = () => {
  const [getSongs, setGetSongs] = useState(true);
  const [showSongsList, setShowSongsList] = useState(false);
  const [showArtWorksList, setShowArtWorksList] = useState(false);
  const [showSongsRequestList, setShowSongsRequestList] = useState(false);

  const hideSongLists = () => {
    setShowSongsList(false);
  };

  const hideSongRequestList = () => {
    setShowSongsRequestList(false);
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full py-5 flex justify-between items-end">
        <div className="flex items-center space-x-5">
          <img src={CatalogPng} alt="" className="w-20" />

          <div>
            <p className="text-xl uppercase">LINKIN PARK METERORA</p>

            <div className="flex space-x-10 text-xs mt-3">
              <p>5 songs</p>
              <p>5 artworks</p>
              <p className="text-secondaryColor">5 members</p>
            </div>
          </div>
        </div>

        <button
          className="px-3 py-2 rounded-md bg-secondaryBg flex items-center space-x-3"
          onClick={() => setShowSongsRequestList(true)}
        >
          <p>Request Pending</p>
          <p className="bg-secondaryColor px-2 rounded-md text-xs font-bold">
            2
          </p>
        </button>
      </div>

      <div className="w-full">
        <ul className="flex space-x-10">
          <li
            className={
              getSongs
                ? 'underline underline-offset-8 cursor-pointer'
                : 'cursor-pointer'
            }
            onClick={() => setGetSongs(true)}
          >
            Songs
          </li>
          <li
            className={
              !getSongs
                ? 'underline underline-offset-8 cursor-pointer'
                : 'cursor-pointer'
            }
            onClick={() => setGetSongs(false)}
          >
            Artworks
          </li>
        </ul>
      </div>

      <div className="w-full px-10">
        {getSongs ? <SongsList /> : <ArtworksList />}
      </div>

      {showSongsList && (
        <div className="absolute -top-[10vh] -left-8 w-screen h-screen">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 z-20">
            <SongsListPopUp hideSongLists={hideSongLists} />
          </div>
        </div>
      )}

      {showSongsRequestList && (
        <div className="absolute -top-[10vh] -left-8 w-screen h-screen">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 z-20">
            <SongsRequestList hideSongRequestList={hideSongRequestList} />
          </div>
        </div>
      )}

      {(showSongsList || showSongsRequestList) && (
        <div
          onClick={() => {
            hideSongLists();
            hideSongRequestList();
          }}
          className="absolute -top-[10vh] -left-8 w-screen h-screen bg-[rgba(0,0,0,0.8)] z-10"
        ></div>
      )}

      {getSongs ? (
        <button
          className="absolute bottom-20 right-0 bg-secondaryColor px-8 py-2 rounded-lg"
          onClick={() => setShowSongsList(true)}
        >
          Add New Song
        </button>
      ) : (
        <button
          className="absolute bottom-20 right-0 bg-secondaryColor px-8 py-2 rounded-lg"
          onClick={() => setShowArtWorksList(true)}
        >
          Add New Artworks
        </button>
      )}
    </div>
  );
};

export default Catalog;
