import React, { useEffect, useState } from 'react';
import LoginBg from '../../assets/images/loginbg.png';
import { AiOutlineSearch } from 'react-icons/ai';
import LoginArtist from '../../assets/images/loginartist.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JoinArtists = () => {
  let [catalogs, setCatalogs] = new useState([]);

  const navigate = useNavigate();

  const fetchCats = async () => {
    try {
      const { data } = await axios.get('/cat/all_cata');

      setCatalogs((catalogs = data.result.Catalog.data));
      console.log(catalogs);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const [search, setSearch] = useState('');

  // const filterBySearch = (e) => {
  //   const txt = e.target.value;

  //   let updatedCats = [...catalogs];
  //   updatedCats = updatedCats.filter((cat) => {
  //     return cat.c1.toLowerCase().indexOf(txt.toLowerCase()) !== -1;
  //   });

  //   console.log(updatedCats);
  //   setCatalogs(updatedCats);
  // };

  const handleCatalog = async (catId) => {
    const userId = localStorage.getItem('id');

    if (userId) {
      // console.log(userId, catId);

      try {
        // Send login request to the backend
        const response = await axios.post('/cat/req_cata', {
          c1: userId,
          c2: catId,
        });

        console.log(response.data);

        localStorage.removeItem('id');

        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-screen h-screen relative bg-black">
      <div>
        <img
          src={LoginBg}
          alt="Login Background"
          className="object-center object-cover"
        />
      </div>

      <div className="w-3/4 py-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl flex flex-col space-y-8 items-center">
        <div className="w-3/4 rounded-full bg-white px-4 py-2 space-x-4 flex items-center justify-center">
          <input
            type="text"
            className="w-full focus:outline-none bg-white"
            placeholder="Search Here..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <AiOutlineSearch className="text-3xl" />
        </div>

        {search === '' ? (
          <div className="text-white h-[300px] flex items-center text-2xl">
            Type something in the search box to search for catalog you want to
            join!
          </div>
        ) : (
          <div className="grid grid-cols-3 place-items-center w-full h-[300px] overflow-y-auto">
            {catalogs
              .filter((cat) => {
                return search.toLowerCase() === ''
                  ? cat
                  : cat.c1.toLowerCase().includes(search);
              })
              .map((cat) => (
                <div
                  key={cat._id}
                  className="w-60 pb-10 pt-16 mt-16 rounded-xl text-center relative bg-black bg-opacity-10 backdrop-blur-lg text-white"
                >
                  <div className="flex justify-center absolute left-1/2 -translate-x-1/2 -top-1/2 translate-y-1/2">
                    <img
                      src={LoginArtist}
                      alt="Login Artists"
                      className="w-40"
                    />
                  </div>

                  <p className="font-semibold text-xl mt-8 mb-5">{cat.c1}</p>
                  <p className="text-xs"></p>
                  <button
                    className=" bg-secondaryColor px-4 py-1 rounded-lg"
                    onClick={() => handleCatalog(cat._id)}
                  >
                    Join
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinArtists;
