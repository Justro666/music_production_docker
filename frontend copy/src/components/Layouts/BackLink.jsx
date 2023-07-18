import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const BackLink = (props) => {
  return (
    <Link
      to={props.to}
      className="flex items-center space-x-3 bg-white text-black px-4 rounded-lg"
    >
      <AiOutlineLeft />
      <button className="py-2 text-black rounded-md">back</button>
    </Link>
  );
};

export default BackLink;
