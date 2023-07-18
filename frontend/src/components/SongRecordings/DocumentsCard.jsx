import React from 'react';
import DocumentPng from '../../assets/images/document.png'
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const DocumentsCard = () => {
  return (
    <Link to={'documentDetails'} className="py-2 bg-white rounded-md w-72">
      <img src={DocumentPng} alt="" />

      <div className="w-full flex justify-between items-center px-5 pt-3 pb-2">
        <p className="text-black">Agreement (1)</p>
        <button className="py-1 px-2 bg-secondaryColor rounded-md flex items-center space-x-1">
          <AiFillEye />
          View
        </button>
      </div>
    </Link>
  );
};

export default DocumentsCard;
