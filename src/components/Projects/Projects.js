import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import '../../styles/Projects.css';
import axios from 'axios';
import ProjectCategory from './ProjectCategory';
import Project from './Project';
import { AnimatePresence, motion } from "framer-motion";

const categories = ['All','Development', 'Design', 'Sales', 'Marketing'];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectsToShow, setProjectsToShow] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const jwt = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:3000/projects/all_projects', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });
      setProjects(response.data);
      setProjectsToShow(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const filterByCategory = (category) => {
    if (category === 'All') {
      setProjectsToShow(projects);
      return;
    }
    const auxProjects = projects.filter((project) => project.category === category.toLowerCase());
    setProjectsToShow(auxProjects);
  }

  return (
    <div className='projectsContainer'>
      <Sidebar />
      <div className='projects'>
        <div className='title'>Projects</div>
        <div className='filter'>Filter by Category:</div>
        <div className='categories'>
          {categories.map((category) => {
            return <ProjectCategory key={category} category={category} filterByCategory={filterByCategory} />
          })}
        </div>
        <div className='displayProjects'>
          <AnimatePresence>
            {projectsToShow.map((project) => {
              return <motion.div
              key={project._id}
              style={{ overflow: "hidden" }}
              layout
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              exit={{ transform: "scale(0)", duration: 0 }}
            >
              <Project project={project}/>
            </motion.div>
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Projects