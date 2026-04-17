import React, { useState, useEffect } from 'react';
import { credentialApi } from '../api';
import CredentialCard from '../components/CredentialCard';

const Credentials = () => {
  const [credentials, setCredentials] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const res = await credentialApi.getAll(category === 'all' ? null : category);
        setCredentials(res.data);
      } catch (err) {
        console.error("Failed to fetch credentials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCredentials();
  }, [category]);

  return (
    <div className="credentials-page">
      <header className="credentials-hero section">
        <div className="container">
          <h2 className="section-title">Credentials & Certifications</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto' }}>
            View my complete history of academic excellence, professional certifications, and honor awards.
          </p>
          
          <div className="project-filters">
            <button className={`filter-btn ${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')}>All</button>
            <button className={`filter-btn ${category === 'work' ? 'active' : ''}`} onClick={() => setCategory('work')}>Work & Skills</button>
            <button className={`filter-btn ${category === 'academic' ? 'active' : ''}`} onClick={() => setCategory('academic')}>Academic</button>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {loading ? (
            <div className="loading">Loading credentials...</div>
          ) : (
            <div className="credentials-grid">
              {credentials.map(cred => (
                <CredentialCard key={cred.id} credential={cred} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Credentials;
