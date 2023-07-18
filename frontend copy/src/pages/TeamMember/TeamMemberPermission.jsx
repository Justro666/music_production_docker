import React, { useEffect, useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import {
  AiFillEye,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import BackLink from '../../components/Layouts/BackLink';
import { HiUsers } from 'react-icons/hi';
import axios from 'axios';

const TeamMemberPermission = () => {
  let [cataLogs, setCataLogs] = useState([]);
  let [cataLogId, setCataLogId] = useState('');

  let [permissions, setPermissions] = useState([]);
  let [roles, setRoles] = useState([]);

  let [assignPermissions, setAssignPermissions] = useState([]);

  let [permissionArray, setPermissionArray] = useState([]);

  const [permissionBox, setPermissionBox] = useState(false);

  const [mainIndex, setMainIndex] = useState(null);
  const [subIndex, setSubIndex] = useState(null);

  const [loading, setLoading] = useState(false);

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

  const fetchPermissions = async (cataLogId) => {
    try {
      const token = localStorage.getItem('token');

      const body = {
        catId: cataLogId,
      };

      const { data } = await axios.post('/setting/permission', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPermissions((permissions = data.result.data.Permissions));
      setRoles((roles = data.result.data.Roles));

      setAssignPermissions(
        (assignPermissions = permissions.filter(
          (permission) => permission.c3 === 0
        ))
      );

      console.log(assignPermissions);

      let templateArray = [];

      for (let r = 0; r < roles.length; r++) {
        templateArray.push({ _id: '', c1: roles[r].c1, c4: [] });
        for (let i = 0; i < assignPermissions.length; i++) {
          templateArray[r].c4.push({
            _id: '',
            c1: assignPermissions[i].c1,
            c3: 2,
          });
        }
      }

      console.log(templateArray);
      console.log(roles);

      for (let t = 0; t < templateArray.length; t++) {
        if (roles[t].c1 === templateArray[t].c1) {
          templateArray[t]._id = roles[t]._id;
        }

        if (roles[t].c4.length !== 0) {
          for (let i = 0; i < templateArray[t].c4.length; i++) {
            for (let r = 0; r < roles[t].c4.length; r++) {
              const newArr = roles[t].c4.filter(
                (rl) => rl.c1 === templateArray[t].c4[i].c1
              );
              if (newArr.length > 0) {
                templateArray[t].c4[i].c3 = newArr[0].c3;
                templateArray[t].c4[i]._id = newArr[0]._id;
              }
            }
          }
        }
      }

      console.log(templateArray);

      // for (let r = 0; r < roles.length; r++) {
      //   setPermissionArray(
      //     (permissionArray[r] = [
      //       {
      //         id: roles[r]._id,
      //         name: roles[r].c1,
      //         c4: [],
      //       },
      //     ])
      //   );
      //   for (let p = 0; p < assignPermissions.length; p++) {
      //     if (roles[r].c4[p] && roles[r].c4[p].c1 === assignPermissions[p].c1) {
      //       setPermissionArray(
      //         (permissionArray[r][0].c4[p] = {
      //           field: roles[r].c4[p].c1,
      //           permission: roles[r].c4[p].c3,
      //         })
      //       );
      //     } else {
      //       setPermissionArray(
      //         (permissionArray[r][0].c4[p] = {
      //           field: assignPermissions[p].c1,
      //           permission: 2,
      //         })
      //       );
      //     }
      //   }
      // }

      setAssignPermissions((permissionArray = templateArray));
      setPermissionArray((permissionArray = permissionArray.flat(1)));

      console.log(permissionArray);
      // setPermissionArray((permissionArray = Object.entries(permissionArray)));
      // console.log(permissionArray);
    } catch (error) {
      console.log(error);
    }
  };

  const reassignPermissions = (status) => {
    setPermissionArray((permissionArray[mainIndex].c4[subIndex].c3 = status));
    setPermissionArray(permissionArray.flat(1));
  };

  const submitPermissions = async () => {
    setPermissionArray(permissionArray.flat(1));
    for (let i = 0; i < permissionArray.length; i++) {
      for (let j = 0; j < permissions.length; j++) {
        for (let y = 0; y < permissionArray[i].c4.length; y++) {
          if (permissionArray[i].c4[y].c3 === 2) {
            setPermissionArray((permissionArray[i].c4[y].c3 = 2));
          } else if (
            permissionArray[i].c4[y].c1 === permissions[j].c1 &&
            permissionArray[i].c4[y].c3 === permissions[j].c3
          ) {
            setPermissionArray(
              (permissionArray[i].c4[y]._id = permissions[j]._id)
            );
          }
        }
      }
    }

    console.log(permissionArray);
    setPermissionArray(permissionArray.flat(1));

    try {
      const token = localStorage.getItem('token');

      const body = {
        catId: cataLogId,
        permissions: permissionArray,
      };

      const { data } = await axios.patch('setting/permission', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  useEffect(() => {
    cataLogId !== '' && fetchPermissions(cataLogId);
  }, [cataLogId]);

  return (
    <div className="w-full h-full space-y-5 px-5 py-1">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      {/* permission box */}
      {permissionBox && (
        <div
          className="w-screen h-screen absolute -top-24 left-0 z-40"
          onClick={() => {
            setPermissionBox(false);
          }}
        ></div>
      )}

      {permissionBox && (
        <div className="absolute h-96 w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-xl bg-darkBlue z-50 flex flex-col justify-center items-center space-y-4">
          <div
            onClick={() => {
              setPermissionBox(false);
              reassignPermissions(0);
            }}
            className="px-10 py-2 flex items-center space-x-3 bg-secondaryGray rounded-xl cursor-pointer"
          >
            <AiFillEye className="text-5xl" />
            <p className="text-2xl">View</p>
          </div>
          <div
            onClick={() => {
              setPermissionBox(false);
              reassignPermissions(1);
            }}
            className="px-10 py-2 flex items-center space-x-3 bg-secondaryGray text-primaryColor rounded-xl cursor-pointer"
          >
            <AiFillCheckCircle className="text-5xl" />
            <p className="text-2xl">Access</p>
          </div>
          <div
            onClick={() => {
              setPermissionBox(false);
              reassignPermissions(2);
            }}
            className="px-10 py-2 flex items-center space-x-3 bg-secondaryGray text-secondaryRed rounded-xl cursor-pointer"
          >
            <AiFillCloseCircle className="text-5xl" />
            <p className="text-2xl">Denied</p>
          </div>
        </div>
      )}
      {/* permission box */}

      {/* {loading && (
        <div
          className="w-screen h-screen absolute -top-24 left-0 z-40"
          onClick={() => {
            setPermissionBox(false);
          }}
        ></div>
      )} */}

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

      <div className="w-full space-y-3">
        <div className="w-full grid grid-cols-7">
          <p className="text-center"></p>
          {permissions
            .filter((permission) => permission.c3 === 0)
            .map((permission) => (
              <p key={permission._id} className="text-center">
                {permission.c1}
              </p>
            ))}
        </div>

        {permissionArray.map((permission, index) => (
          <div key={permission._id} className="w-full grid grid-cols-7">
            <p className="text-center py-4 pl-5 bg-secondaryGray flex items-center justify-start">
              {permission.c1}
            </p>
            {permission.c4.map((per, notIndex) =>
              per.c3 === 0 ? (
                <p
                  onClick={() => {
                    setPermissionBox(true);
                    setMainIndex(index);
                    setSubIndex(notIndex);
                  }}
                  className="text-center py-4 bg-white flex justify-center items-center text-3xl text-secondaryGray border border-l-0 border-t-0 border-b-0 border-r-secondaryGray cursor-pointer"
                >
                  <AiFillEye />
                </p>
              ) : per.c3 === 1 ? (
                <p
                  onClick={() => {
                    setPermissionBox(true);
                    setMainIndex(index);
                    setSubIndex(notIndex);
                  }}
                  className="text-center py-4 bg-white flex justify-center items-center text-3xl text-primaryColor border border-l-0 border-t-0 border-b-0 border-r-secondaryGray cursor-pointer"
                >
                  <AiFillCheckCircle />
                </p>
              ) : (
                <p
                  onClick={() => {
                    setPermissionBox(true);
                    setMainIndex(index);
                    setSubIndex(notIndex);
                  }}
                  className="text-center py-4 bg-white flex justify-center items-center text-3xl text-secondaryRed border border-l-0 border-t-0 border-b-0 border-r-secondaryGray cursor-pointer"
                >
                  <AiFillCloseCircle />
                </p>
              )
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 pr-16 flex w-full justify-between items-center">
        <BackLink to={`/teamMember`} />

        <div className="flex space-x-2">
          <Link
            to={`addMember`}
            className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
          >
            <HiUsers />
            <span>Add Member</span>
          </Link>
          <button
            onClick={() => submitPermissions()}
            className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberPermission;
