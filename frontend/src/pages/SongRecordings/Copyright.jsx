import React from 'react';
import BackLink from '../../components/Layouts/BackLink';
import { Link } from 'react-router-dom';

const Copyright = () => {
  return (
    <div className="w-full h-full relative pt-2">
      <p className="text-2xl font-bold my-5">Copyright</p>

      <div className="flex justify-center mt-20">
        <div className="w-1/4 h-[450px] bg-secondaryBg rounded-md flex flex-col p-8 items-center relative"></div>
      </div>

      <BackLink to={'/songrecordings/mastering/masteringReview'} />

      <Link
        className="absolute bottom-5 right-0 bg-tertiary px-8 py-2 rounded-lg"
      >
        Request Publish
      </Link>
    </div>
  );
};

export default Copyright;
