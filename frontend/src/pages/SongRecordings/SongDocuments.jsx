import React from 'react';
import DocumentsCard from '../../components/SongRecordings/DocumentsCard';
import BackLink from '../../components/Layouts/BackLink';

const SongDocuments = () => {
  return (
    <div className="w-full h-full relative pt-2">
      <p className="text-2xl font-bold my-5">Documents</p>

      <div className="w-full grid grid-cols-4 gap-5">
        <DocumentsCard />
        <DocumentsCard />
        <DocumentsCard />
        <DocumentsCard />
        <DocumentsCard />
      </div>

      <BackLink to={'/songrecordings'} />
    </div>
  );
};

export default SongDocuments;
