import React from 'react';

const TeamMember = () => {
  const teamMemberList = [];

  for (let index = 0; index < 4; index++) {
    teamMemberList.push(
      <div className="w-full flex justify-between items-center py-4 px-10 bg-secondaryBg rounded-xl">
        <p>New Member</p>

        <div className="flex space-x-10">
          <div className="flex space-x-3 items-center">
            <input type="checkbox" className="w-4 h-4" />
            <p>Can View</p>
          </div>
          <div className="flex space-x-3 items-center">
            <input type="checkbox" className="w-4 h-4" />
            <p>Can View</p>
          </div>
        </div>
      </div>
    );
  }

  return <div className="w-full flex flex-col space-y-3">{teamMemberList}</div>;
};

export default TeamMember;
