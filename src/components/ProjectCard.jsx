import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  return (
    <article className="glass project-card reveal active">
      <div className={`project-img visual-${project.category}`} aria-hidden="true">
        {project.image_url && <img src={project.image_url} alt={project.title} />}
      </div>
      <div className="project-info">
        <div className="project-badges">
          <span className={`category-badge ${project.category}`}>
            {project.category.replace('-', ' ')}
          </span>
          {project.tags.split(',').map(tag => (
            <span key={tag} className="tech-badge">{tag.trim()}</span>
          ))}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-links">
          {project.live_link && (
            <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="btn secondary small">
              <ExternalLink size={16} /> View Project
            </a>
          )}
          {project.code_link && (
            <a href={project.code_link} target="_blank" rel="noopener noreferrer" className="btn secondary small">
              <FaGithub size={16} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
