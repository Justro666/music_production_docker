import React, { useState } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';
import { Link } from 'react-router-dom';
import { BsFillShieldLockFill } from 'react-icons/bs';
import BackLink from '../../components/Layouts/BackLink';
import { useEffect } from 'react';
import axios from 'axios';

const RequestMember = () => {
  const [requestedMember, setRequestedMember] = useState([]);

  const fetchRequestMember = async () => {
    try {
      const token = localStorage.getItem('token');
      const catalogId = localStorage.getItem('catalog');

      const body = {
        catId: catalogId,
      };

      const { data } = await axios.post('/team/team_request_list', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequestedMember((prev) => (prev = data.result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      fetchRequestMember();
    };
  }, []);

  const approveMember = (memberId) => {};
  const rejectMember = (memberId) => {};

  // const memberLists = [];

  // for (let index = 0; index < 15; index++) {
  //   memberLists.push(
  // <tr className="py-2">
  //   <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-tl-xl rounded-bl-xl">
  //     <p className="font-bold">Contributor</p>
  //   </td>
  //   <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
  //     Contributor@gmail.com
  //   </td>
  //   <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
  //     Role
  //   </td>
  //   <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
  //     20/12/2022
  //   </td>
  //   <td className="whitespace-nowrap py-2 bg-white bg-opacity-20 backdrop-blur-lg">
  //     <button className="text-sm font-semibold bg-primaryColor rounded-md px-3 py-2">
  //       Accept
  //     </button>
  //   </td>
  //   <td className="whitespace-nowrap py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-tr-xl rounded-br-xl">
  //     <button className="text-sm font-semibold bg-secondaryRed rounded-md px-3 py-2 ">
  //       Reject
  //     </button>
  //   </td>
  // </tr>
  //   );
  // }

  return (
    <div className="w-full h-full space-y-5 px-5 py-1">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      {requestedMember.length === 0 ? (
        <p className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          No Requested Members Here Yet!!!
        </p>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="h-[600px] 2xl:h-[750px] overflow-y-auto">
                <table
                  className="min-w-full text-left text-sm font-light rounded-md border-spacing-y-2 border-separate"
                  cellSpacing={12}
                >
                  <tbody>
                    {requestedMember.map((member) => (
                      <tr className="py-2">
                        <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-tl-xl rounded-bl-xl">
                          <p className="font-bold">Contributor</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                          Contributor@gmail.com
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                          Role
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                          20/12/2022
                        </td>
                        <td className="whitespace-nowrap py-2 bg-white bg-opacity-20 backdrop-blur-lg">
                          <button
                            onClick={() => approveMember()}
                            className="text-sm font-semibold bg-primaryColor rounded-md px-3 py-2"
                          >
                            Accept
                          </button>
                        </td>
                        <td className="whitespace-nowrap py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-tr-xl rounded-br-xl">
                          <button
                            onClick={() => rejectMember()}
                            className="text-sm font-semibold bg-secondaryRed rounded-md px-3 py-2 "
                          >
                            Reject
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
      )}

      <div className="absolute bottom-5 pr-10 flex w-full justify-between items-center">
        <BackLink to={`/teamMember`} />
        <Link
          to={'/teamMember/permission'}
          className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center"
        >
          <BsFillShieldLockFill />
          <span>Permission</span>
        </Link>
      </div>
    </div>
  );
};

export default RequestMember;
