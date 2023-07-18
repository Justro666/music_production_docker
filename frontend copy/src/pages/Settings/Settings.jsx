import React, { useEffect, useState } from 'react';
import HelpAndContactUs from './HelpAndContactUs';
import SettingsArchieved from './SettingsArchieved';
import Documents from './Documents';
import Templates from './Templates';

const Settings = (props) => {
  useEffect(() => {
    document.title = 'Settings - Overstood';
  }, []);

  const [activeNumber, setActiveNumber] = useState(
    props.activeNumber ? props.activeNumber : 1
  );

  return (
    <div className="w-full px-10 text-white">
      <div className="w-full py-5">
        <ul className="flex space-x-10">
          <li
            className={
              activeNumber === 1
                ? 'underline underline-offset-8 cursor-pointer text-secondaryColor'
                : 'cursor-pointer hover:text-secondaryColor'
            }
            onClick={() => setActiveNumber(1)}
          >
            Archived
          </li>
          <li
            className={
              activeNumber === 2
                ? 'underline underline-offset-8 cursor-pointer text-secondaryColor'
                : 'cursor-pointer hover:text-secondaryColor'
            }
            onClick={() => setActiveNumber(2)}
          >
            Help/Contact Us
          </li>
          <li
            className={
              activeNumber === 3
                ? 'underline underline-offset-8 cursor-pointer text-secondaryColor'
                : 'cursor-pointer hover:text-secondaryColor'
            }
            onClick={() => setActiveNumber(3)}
          >
            Documents
          </li>
          <li
            className={
              activeNumber === 4
                ? 'underline underline-offset-8 cursor-pointer text-secondaryColor'
                : 'cursor-pointer hover:text-secondaryColor'
            }
            onClick={() => setActiveNumber(4)}
          >
            Preset Templates
          </li>
        </ul>
      </div>

      <div className="w-full py-5 h-full overflow-y-auto">
        {activeNumber === 1 && <SettingsArchieved />}
        {activeNumber === 2 && <HelpAndContactUs />}
        {activeNumber === 3 && <Documents />}
        {activeNumber === 4 && <Templates />}
      </div>
    </div>
  );
};

export default Settings;
