import React, { useEffect, useState } from 'react';
import FolderItem from './FolderItem';
import axios from 'axios';

const Projects = ({ setLoading, search }) => {
  let [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');

      const { data } = await axios.get('/cloud/project_collection', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setLoading((prevState) => (prevState = false));
      }

      // console.log(data);
      setProjects((projects = data.result.data));
      // console.log(projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-5 gap-3 h-[550px] 2xl:h-[700px] overflow-y-auto customScrollY pr-3">
      {projects.map((project) => (
        <FolderItem />
      ))}
    </div>
  );
};

export default Projects;
