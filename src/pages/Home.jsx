import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { messageApi, projectApi } from '../api';
import { aboutParagraphs, projectCategories, skillGroups } from '../data/siteContent';

function SkillIcon({ type }) {
  switch (type) {
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71Z" />
        </svg>
      );
    case 'trend':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23 6 13.5 15.5l-5-5L1 18l1.5 1.5 7-7 5 5L24 7Z" />
        </svg>
      );
    case 'grid':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 6.5 11h11L12 2Zm5.5 11A4.5 4.5 0 1 0 22 17.5 4.5 4.5 0 0 0 17.5 13ZM3 13v8h8v-8Z" />
        </svg>
      );
    case 'plus':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-1 10h-5v5h-2v-5H6v-2h5V6h2v5h5Z" />
        </svg>
      );
    case 'code':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9.4 16.6-4.6-4.6 4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z" />
        </svg>
      );
    default:
      return null;
  }
}

const initialForm = { name: '', email: '', message: '' };

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8 }
};

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    document.title = 'Solomon Tsega - Data Scientist & Web Developer | Portfolio';
  }, []);

  useEffect(() => {
    let ignore = false;

    async function fetchProjects() {
      setProjectsLoading(true);

      try {
        const response = await projectApi.getAll();
        if (!ignore) {
          setProjects(response.data);
        }
      } catch (error) {
        if (!ignore) {
          setStatus({
            type: 'error',
            message: 'I could not load the projects right now. Please refresh and try again.',
          });
        }
      } finally {
        if (!ignore) {
          setProjectsLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      ignore = true;
    };
  }, []);

  const visibleProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects;
    }

    return projects.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  function validate(values) {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = 'Please enter your name';
    } else if (values.name.trim().length < 2) {
      nextErrors.name = 'Name must be at least 2 characters';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!values.message.trim()) {
      nextErrors.message = 'Please enter your message';
    } else if (values.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters';
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus({ type: 'sending', message: '' });

    try {
      await messageApi.send({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setFormData(initialForm);
      setErrors({});
      setStatus({
        type: 'success',
        message: "Thank you for your message! I'll get back to you soon.",
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      });
    }
  }

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  }

  return (
    <>
      <header id="home" className="hero section" role="banner">
        <div className="container hero-container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hero-image"
          >
            <img
              src="https://avatars.githubusercontent.com/u/202438118?v=4"
              alt="Solomon Tsega"
              className="profile-photo"
            />
          </motion.div>
          <div className="hero-content">
            <p align="center">
              <picture>
                <source
                  media="(max-width: 480px)"
                  srcSet="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&duration=3500&pause=1000&color=70A5FD&center=true&vCenter=true&random=false&width=400&lines=Machine+Learning+%7C+Data+Science+%7C+A.I.;NLP+%26+Transformer+Models+%7C+LLMs+%26+RAG;SQL+%26+Advanced+Data+Analysis;AI+Model+Evaluation+%26+Deployment"
                />
                <img
                  src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3500&pause=1000&color=70A5FD&center=true&vCenter=true&random=false&width=600&lines=Machine+Learning+%7C+Data+Science+%7C+A.I.;NLP+%26+Transformer+Models+%7C+LLMs+%26+RAG;SQL+%26+Advanced+Data+Analysis+%7C+Visualization;AI+Model+Evaluation+%26+Deployment+%7C+MLOps;Python+%7C+FastAPI+%7C+Full-Stack+Development;Turning+Raw+Data+Into+Actionable+Intelligence"
                  alt="Typing SVG"
                  className="hero-typing-svg"
                />
              </picture>
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Building intelligent Machine Learning systems, uncovering deep Data Science insights,
              and crafting premium, data-driven Web experiences.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hero-btns"
            >
              <a href="#projects" className="btn primary">
                View My Work
              </a>
              <a href="/credentials" className="btn secondary">
                View Credentials
              </a>
              <a
                href="https://github.com/soltsega"
                target="_blank"
                rel="noopener noreferrer"
                className="btn secondary"
              >
                GitHub
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      <section id="projects" className="section" aria-labelledby="projects-title">
        <div className="container">
          <motion.h2 {...fadeInUp} id="projects-title" className="section-title">
            Featured Projects
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="project-filters" 
            role="tablist" 
            aria-label="Project categories"
          >
            {projectCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                role="tab"
                aria-selected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <div className="projects-grid" id="projects-grid" role="tabpanel">
            {projectsLoading ? <div className="loading">Loading projects...</div> : null}

            {!projectsLoading &&
              visibleProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} delay={index * 0.1} />
              ))}

            {!projectsLoading && visibleProjects.length === 0 ? (
              <div className="glass no-results-message">
                <h3>No projects found</h3>
                <p>Try selecting a different category to see more projects.</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="about" className="section" aria-labelledby="about-title">
        <div className="container about-content">
          <motion.div {...fadeInUp}>
            <h2 id="about-title" className="section-title">
              About Me
            </h2>
            <div className="glass about-card">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="section" aria-labelledby="skills-title">
        <div className="container">
          <motion.h2 {...fadeInUp} id="skills-title" className="section-title">
            Technical Expertise
          </motion.h2>
          <div className="skills-container">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass skill-category"
              >
                <div className="category-header">
                  <div className="category-icon">
                    <SkillIcon type={group.icon} />
                  </div>
                  <h3 className="category-title">{group.title}</h3>
                </div>
                <div className="skill-tags">
                  {group.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="credentials" className="section" aria-labelledby="credentials-title">
        <div className="container">
          <motion.h2 {...fadeInUp} id="credentials-title" className="section-title">
            Credentials & Certifications
          </motion.h2>
          <motion.p {...fadeInUp} className="credentials-intro">
            View my complete history of academic excellence, professional certifications, and
            honor awards.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="project-filters credentials-cta"
          >
            <a href="/credentials" className="btn primary">
              Skills & Work Experience
            </a>
            <a href="/credentials" className="btn secondary">
              Academic Credentials
            </a>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="section" aria-labelledby="contact-title">
        <div className="container contact-container">
          <motion.div {...fadeInUp}>
            <h2 id="contact-title" className="section-title">
              Let&apos;s Connect
            </h2>
            <p className="contact-intro">
              Feel free to reach out for collaborations or just to say hi!
            </p>
            <div className="glass contact-card">
              {status.type === 'success' ? (
                <div className="success-message">
                  <p>{status.message}</p>
                </div>
              ) : null}

              <form className="contact-form" noValidate onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`glass-input ${errors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.name)}
                  />
                  <span className="error-message">{errors.name || ''}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`glass-input ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.email)}
                  />
                  <span className="error-message">{errors.email || ''}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className={`glass-input ${errors.message ? 'error' : ''}`}
                    value={formData.message}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.message)}
                  />
                  <span className="error-message">{errors.message || ''}</span>
                </div>

                {status.type === 'error' ? <span className="error-message">{status.message}</span> : null}

                <button type="submit" className="btn primary submit-btn" disabled={status.type === 'sending'}>
                  {status.type === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
