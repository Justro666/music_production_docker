import React from 'react';

const SideAlert = (props) => {
  return (
    <div className="px-10 py-3 rounded-lg bg-secondaryRed backdrop-blur-lg bg-opacity-60 border-2 border-white">
      <p>{props.name}</p>
    </div>
  );
};

export default SideAlert;
