import React, { useState } from 'react';
import BackLink from '../../components/Layouts/BackLink';
import { AiFillSave } from 'react-icons/ai';
import BackgroundImageZZ from '../../assets/images/backgroundImageZZ.png';

const EditArtwork = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const reader = new FileReader();

  const handlePreviewImage = (element) => {
    if (!element.target.files[0]) return;
    reader.readAsDataURL(element.target.files[0]);
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const { height, width } = image;
        if (!(height >= 1500 && width >= 1500 && height === width)) {
          setImgSrc(null);
          setShowImage(false);
          setImgError(true);
          return false;
        }
        setImgError(false);
        setShowImage(true);
        setImgSrc(URL.createObjectURL(element.target.files[0]));
        return true;
      };
    };
  };

  return (
    <div className="w-full h-full p-5">
      <img
        src={BackgroundImageZZ}
        className="absolute top-0 left-0 w-full h-full bg-center -z-10"
        alt=""
      />

      <p className="text-3xl">Edit Artwork</p>
      <div className="flex justify-evenly mt-20">
        <div className="flex flex-col items-center space-y-5 p-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl">
          <label
            htmlFor="artworkImage"
            className="w-96 h-96 bg-white rounded-md overflow-hidden cursor-pointer flex justify-center items-center"
          >
            {showImage && (
              <img
                src={imgSrc}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
            {imgError && (
              <p className="text-secondaryRed font-bold px-5">
                Image Size must be greater than or equal to 1500 x 1500 (pixels)
                and also must be square.
              </p>
            )}
          </label>

          <input
            type="file"
            id="artworkImage"
            className="hidden"
            accept="image/*"
            onChange={handlePreviewImage}
          />
        </div>

        <div className="flex flex-col space-y-5 p-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl">
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Artwork's Name</label>
            <input
              type="text"
              className="bg-secondaryBg rounded-xl p-2 outline-none w-96"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              className="bg-secondaryBg rounded-xl p-2 outline-none w-96 h-44 resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 pr-10 flex w-full justify-between items-center">
        <BackLink to={'/artworks'} />

        <button className="bg-primaryColor text-white px-5 py-2 rounded-md flex space-x-3 items-center">
          <AiFillSave />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default EditArtwork;
