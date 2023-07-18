import React, { useEffect } from 'react';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';

const Notifications = () => {
  useEffect(() => {
    document.title = 'Notifications - Overstood';
  }, []);

  const notificationsList = [];

  for (let index = 0; index < 15; index++) {
    notificationsList.push(
      <div className="w-full flex justify-between items-center py-4 px-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl">
        <p>New song status is now approved </p>
        <p>20/5/2022</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-10">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />
      <div className="w-full h-[600px] 2xl:h-[800px] overflow-y-auto customScrollY pr-5 flex flex-col space-y-3">
        {notificationsList}
      </div>
    </div>
  );
};

export default Notifications;
