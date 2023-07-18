import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMember = () => {
  let [cataLogId, setCataLogId] = useState('');
  let [cataLogs, setCataLogs] = useState([]);
  let [roleId, setRoleId] = useState('');
  let [roles, setRoles] = useState([]);

  const [email, setEmail] = useState('');

  const navigate = useNavigate();

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

      // console.log(cataLogs);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoles = async (cataLogId) => {
    try {
      const token = localStorage.getItem('token');

      const body = {
        catId: cataLogId,
      };

      const { data } = await axios.patch('/team/team_member_list', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      setRoles((roles = data.result.data));
      setRoleId((roleId = roles[0]?._id));

      // console.log(roleId);
    } catch (error) {
      console.log(error);
    }
  };

  const pushMember = async () => {
    try {
      const token = localStorage.getItem('token');

      const body = {
        cataId: cataLogId,
        roleId: roleId,
        email: email,
      };

      const { data } = await axios.patch('/team/team_member_list', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(data);

      if (data) {
        navigate('/teamMember');
      }

      // console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  useEffect(() => {
    return () => {
      fetchRoles(cataLogId);
    };
  }, [cataLogId]);

  return (
    <div className="w-full h-full space-y-5">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      <div className="w-3/4 md:w-2/5 py-8 px-6 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl flex flex-col space-y-4">
        <p className="text-xl font-semibold mb-3 text-white">Add Member</p>

        <div className="w-full flex flex-col items-center space-y-3">
          <div className="flex flex-col space-y-3 w-2/3">
            <label htmlFor="">Catalog</label>
            <select
              className="w-full py-2 px-3 text-white bg-white bg-opacity-10 rounded-xl active:outline-none focus:outline-none"
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

          <div className="flex flex-col space-y-3 w-2/3">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 px-3 text-white bg-white bg-opacity-10 rounded-xl active:outline-none focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-3 w-2/3">
            <label htmlFor="">Role</label>

            <select
              className="w-full py-2 px-3 text-white bg-white bg-opacity-10 rounded-xl active:outline-none focus:outline-none"
              defaultValue={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            >
              {roles?.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.c1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex justify-between items-center pt-8">
          <Link
            to={'/teamMember/permission'}
            className="px-4 py-2 rounded-md bg-secondaryRed text-white"
          >
            Cancel
          </Link>
          <button
            onClick={() => pushMember()}
            className="px-4 py-2 rounded-md bg-primaryColor text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
