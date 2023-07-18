import React from 'react';
import SignOne from '../../assets/images/signone.png';
import SignTwo from '../../assets/images/signtwo.png';
import BackLink from '../../components/Layouts/BackLink';

const EditDocuments = () => {
  return (
    <div className="w-full h-full px-10 text-white relative py-5">
      <p className="text-2xl font-bold my-5">Agreement 1</p>

      <div className="mx-auto w-2/3 mt-10">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi,
          deleniti.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          dolor maiores! Eveniet blanditiis rem explicabo fugit autem aperiam,
          architecto est et iure ea cupiditate nihil quos consectetur illum cum
          quidem ad debitis veniam ut voluptatem, animi voluptas maiores
          voluptates. Quas soluta pariatur recusandae cupiditate velit? Illum
          voluptas, corrupti porro incidunt omnis accusantium obcaecati deleniti
          facere quod culpa beatae eveniet ullam voluptatem dolore possimus iste
          animi, doloremque quae temporibus! Incidunt provident animi expedita
          minima! Ducimus voluptas necessitatibus impedit placeat, asperiores
          est quisquam. Assumenda at error officia ducimus! Qui necessitatibus
          porro fugiat consectetur obcaecati tempora, libero suscipit eius
          mollitia, excepturi maxime! Nihil.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
          repellendus harum vel neque vitae accusantium tenetur molestiae
          dolorem qui, ab quia porro perferendis reprehenderit unde nam
          repudiandae eum rerum deleniti facilis magni ratione nulla impedit
          doloremque! Totam magnam pariatur laboriosam quidem, deserunt,
          voluptatum error rem omnis sed, soluta sapiente eligendi praesentium!
          Placeat, itaque reprehenderit delectus numquam quaerat voluptatibus
          nostrum molestias, porro cum molestiae, nemo magni fugiat! Quod
        </p>

        <div className="w-full flex justify-between items-center mt-5">
          <div className="flex flex-col items-center space-y-5">
            <img src={SignOne} alt="" className="w-32" />
            <p>Admin’s Signature</p>
          </div>
          <div className="flex flex-col items-center space-y-5">
            <img src={SignTwo} alt="" className="w-32" />
            <p>User’s Signature</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 pr-16 flex w-full justify-start items-center">
        <BackLink to={'/settings'} />
      </div>
    </div>
  );
};

export default EditDocuments;
