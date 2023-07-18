import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import TeamMemberPhoto from '../../assets/images/teamMember.png';
import { FaCrown, FaGuitar } from 'react-icons/fa';
import { BsFillShieldLockFill, BsFillSendFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IoIosPeople } from 'react-icons/io';
import { AiFillMessage } from 'react-icons/ai';
import axios from 'axios';

const TeamMember = () => {
  let [cataLogs, setCataLogs] = useState([]);
  let [cataLogId, setCataLogId] = useState('');

  const [teamMembers, setTeamMembers] = useState([]);
  const [owner, setOwner] = useState(null);

  const fetchCatalogs = async () => {
    try {
      const token = localStorage.getItem('token');

      const { data } = await axios.get('/cat/userCata', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(data);

      setCataLogs((cataLogs = data.result.CataReq.data));
      setCataLogId((cataLogId = cataLogs[0].c1._id));
      localStorage.setItem('cataLogId', cataLogId);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMembers = async (catId) => {
    try {
      const token = localStorage.getItem('token');

      const body = {
        catId: catId,
      };

      console.log(typeof catId);

      const { data } = await axios.post('/team/team_member_list', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.result.data.Members !== null) {
        setTeamMembers((prev) => (prev = data.result.data.Members.c2));
      } else {
        setTeamMembers((prev) => (prev = []));
      }

      // console.log(teamMembers);

      if (data.result.data.Owner.c2) {
        setOwner((prev) => (prev = data.result.data.Owner.c2));
      } else {
        setOwner((prev) => (prev = null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = 'Team Member - Overstood';

    fetchCatalogs();
  }, []);

  useEffect(() => {
    cataLogId !== '' && fetchMembers(cataLogId);
  }, [cataLogId]);

  const [messageBox, setMessageBox] = useState(false);

  return (
    <div className="w-full h-full space-y-5 px-5 py-1">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />
      <div className="w-full flex justify-end">
        <select
          className="bg-white rounded-xl p-2 outline-none w-36 text-black"
          defaultValue={cataLogId}
          onChange={(e) => {
            setCataLogId(e.target.value);
            localStorage.setItem('cataLogId', cataLogId);
          }}
        >
          {cataLogs?.map((cataLog) => (
            <option key={cataLog.c1._id} value={cataLog.c1._id}>
              {cataLog.c1.c1}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[900px] max-h-[580px] 2xl:max-h-[730px] px-10 overflow-y-auto customScrollY grid grid-cols-2 gap-10 absolute left-1/2 -translate-x-1/2">
        {owner !== null && (
          <div className="flex items-center space-x-5 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg px-5 py-8 w-96 h-40 relative">
            <img src={TeamMemberPhoto} alt="" />

            <div>
              <p className="text-lg font-semibold">{owner.c1}</p>
              <p className="text-sm">Owner</p>
            </div>

            <div className="absolute top-2 right-2 text-xl text-tertiary">
              <FaCrown />
            </div>
          </div>
        )}

        {teamMembers?.map((member) => (
          <div
            key={member._id}
            className="flex items-center space-x-5 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg px-5 py-8 w-96 h-40 relative"
          >
            <img src={TeamMemberPhoto} alt="" />

            <div>
              <p className="text-lg font-semibold">{member.c1}</p>
              <p className="text-sm">{member.c4.c1}</p>
            </div>

            <div className="absolute top-2 right-2 text-xl">
              <FaGuitar />
            </div>
          </div>
        ))}
      </div>

      <div
        className={`fixed -top-5 h-full w-[600px]  bg-darkBlue z-10 transition-all duration-700 flex flex-col justify-between ${
          messageBox ? 'right-0' : '-right-[600px]'
        }`}
      >
        <button
          onClick={() => setMessageBox(!messageBox)}
          className="absolute w-20 h-20 rounded-full top-1/2 -translate-y-1/2 -left-10 -z-10 transition-all duration-1000 flex items-center pl-2 bg-secondaryColor"
        >
          <AiFillMessage className="text-3xl" />
        </button>

        <div className="w-full h-full p-5 overflow-y-auto bg-darkBlue"></div>

        <div className="w-full h-24 p-5 flex justify-center items-center">
          <div className="w-full h-full px-5 rounded-lg bg-secondaryGray flex items-center justify-between space-x-5">
            <input
              type="text"
              className="w-full bg-secondaryGray focus:outline-none"
              autoFocus
            />
            <button className="text-2xl">
              <BsFillSendFill />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-10 flex w-full justify-end items-center space-x-4">
        <Link
          to={'requestMember'}
          className="bg-secondaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
        >
          <IoIosPeople />
          <span>Request Member</span>
        </Link>
        <Link
          to={'permission'}
          className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
        >
          <BsFillShieldLockFill />
          <span>Permission</span>
        </Link>
      </div>
    </div>
  );
};

export default TeamMember;
