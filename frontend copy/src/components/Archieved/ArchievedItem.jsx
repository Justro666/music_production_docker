import React from 'react';

const ArchievedItem = () => {
  const archieve = [];

  for (let index = 0; index < 15; index++) {
    archieve.push(
      <tr className="py-2 bg-white hover:bg-secondaryColor cursor-pointer bg-opacity-10 backdrop-blur-lg">
        <td className="whitespace-nowrap px-6 py-2  rounded-tl-xl rounded-bl-xl">
          Love
        </td>
        <td className="whitespace-nowrap px-6 py-4">20:11</td>
        <td className="whitespace-nowrap px-6 py-4">3 Contributors</td>
        <td className="whitespace-nowrap px-6 py-4">ISRCcode</td>
        <td className="whitespace-nowrap px-6 py-4">Pending</td>
        <td className="whitespace-nowrap px-6 py-4">Mp3</td>
        <td className="whitespace-nowrap px-6 py-4 rounded-tr-xl rounded-br-xl">
          20/12/2022
        </td>
      </tr>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="h-[500px] 2xl:h-[600px] overflow-y-auto customScrollY pr-3">
            <table
              className="min-w-full text-left text-sm font-light rounded-md border-spacing-y-2 border-separate"
              cellSpacing={12}
            >
              <tbody>{archieve}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchievedItem;
