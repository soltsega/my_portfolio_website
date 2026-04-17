import React, { useState, useEffect } from 'react';
import { projectApi, messageApi } from '../api';
import ProjectCard from '../components/ProjectCard';
import { Send, CheckCircle } from 'lucide-react';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: '' });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectApi.getAll(filter);
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [filter]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await messageApi.send(formState);
      setFormStatus({ submitted: true, error: '' });
      setFormState({ name: '', email: '', message: '' });
    } catch (err) {
      setFormStatus({ submitted: false, error: 'Failed to send message. Please try again.' });
    }
  };

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'data-analysis', name: 'Data Analysis' },
    { id: 'machine-learning', name: 'Machine Learning' },
    { id: 'software-engineering', name: 'Software Engineering' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header id="home" className="hero section">
        <div className="container hero-container">
          <div className="hero-image reveal active">
            <img 
              src="https://avatars.githubusercontent.com/u/202438118?v=4" 
              alt="Solomon Tsega" 
              className="profile-photo" 
            />
          </div>
          <div className="hero-content">
            <div className="hero-typing">
              <picture>
                <source media="(max-width: 480px)" 
                  srcset="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&duration=3500&pause=1000&color=70A5FD&center=true&vCenter=true&random=false&width=400&lines=Machine+Learning+%7C+Data+Science+%7C+A.I.;NLP+%26+Transformer+Models+%7C+LLMs+%26+RAG;SQL+%26+Advanced+Data+Analysis;AI+Model+Evaluation+%26+Deployment" />
                <img 
                  src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3500&pause=1000&color=70A5FD&center=true&vCenter=true&random=false&width=600&lines=Machine+Learning+%7C+Data+Science+%7C+A.I.;NLP+%26+Transformer+Models+%7C+LLMs+%26+RAG;SQL+%26+Advanced+Data+Analysis+%7C+Visualization;AI+Model+Evaluation+%26+Deployment+%7C+MLOps;Python+%7C+FastAPI+%7C+Full-Stack+Development;Turning+Raw+Data+Into+Actionable+Intelligence"
                  alt="Typing SVG" 
                  className="hero-typing-svg" 
                />
              </picture>
            </div>
            <p className="reveal active">Building intelligent Machine Learning systems, uncovering deep Data Science insights, and crafting premium, data-driven Web experiences.</p>
            <div className="hero-btns reveal active">
              <a href="#projects" className="btn primary">View My Work</a>
              <a href="/credentials" className="btn secondary">View Credentials</a>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="project-filters">
            {categories.map(cat => (
              <button 
                key={cat.id}
                className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {loading ? (
              <div className="loading">Loading projects...</div>
            ) : (
              projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="glass about-card">
            <p>I build machine learning systems that turn raw and unstructured data into practical, usable applications. My work focuses on combining data engineering, NLP, and generative AI to solve real-world problems—ranging from retrieval-augmented generation (RAG) systems and LLM-powered chatbots to predictive models in finance and economic analysis.</p>
            <p style={{ marginTop: '1rem' }}>I’ve worked across the full lifecycle of data-driven systems: collecting and structuring data, building and fine-tuning models, and integrating them into end-to-end pipelines. My experience includes developing RAG systems for knowledge retrieval, applying transformer models for question answering and text summarization, and building predictive models for domains such as credit risk and financial inclusion.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Let's Connect</h2>
          <div className="glass contact-card">
            {formStatus.submitted ? (
              <div className="success-message">
                <CheckCircle size={48} />
                <p>Thank you for your message! I'll get back to you soon.</p>
                <button onClick={() => setFormStatus({ submitted: false, error: '' })} className="btn primary">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="glass-input" 
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    className="glass-input" 
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    required 
                    className="glass-input" 
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  ></textarea>
                </div>
                {formStatus.error && <p className="error-message">{formStatus.error}</p>}
                <button type="submit" className="btn primary" style={{ width: '100%' }}>
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
