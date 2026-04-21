import { useEffect, useMemo, useState } from 'react';
import { credentialApi } from '../api';

function parseDescription(description) {
  return description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function CredentialRow({ credential, reverse = false }) {
  const bullets = parseDescription(credential.description);

  return (
    <div className={`cert-row visible reveal ${reverse ? 'reverse' : ''}`} data-category={credential.category}>
      <div className="cert-desc">
        <h3>{credential.title}</h3>
        {credential.subtitle ? <p>{credential.subtitle}</p> : null}
        {bullets.length > 0 ? (
          <ul>
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {credential.verify_link ? (
          <div className="cert-link-wrap">
            <a href={credential.verify_link} target="_blank" rel="noopener noreferrer" className="btn secondary small">
              Verify Credential
            </a>
          </div>
        ) : null}
      </div>
      <div className="cert-img">
        <img src={credential.image_url} alt={credential.title} />
      </div>
    </div>
  );
}

export default function Credentials() {
  const [credentials, setCredentials] = useState([]);
  const [activeCategory, setActiveCategory] = useState('work');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Credentials | Solomon Tsega';
  }, []);

  useEffect(() => {
    let ignore = false;

    async function fetchCredentials() {
      setLoading(true);

      try {
        const response = await credentialApi.getAll();
        if (!ignore) {
          setCredentials(response.data);
          setError('');
        }
      } catch (fetchError) {
        if (!ignore) {
          setError('Unable to load credentials right now.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchCredentials();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredCredentials = useMemo(
    () => credentials.filter((credential) => credential.category === activeCategory),
    [credentials, activeCategory],
  );

  const workIntroIndex = filteredCredentials.findIndex((credential) => credential.title === 'STEM Computer Training');

  return (
    <div className="container credentials-page">
      <header className="credentials-hero reveal">
        <h1 className="section-title">
          Academic &amp; Professional <span className="gradient-text">Credentials</span>
        </h1>
        <p className="credentials-page-intro">
          A journey of continuous learning, academic excellence, and technical specialization.
          Here are the certifications and honors I&apos;ve earned along the way.
        </p>
      </header>

      <div className="cert-tabs reveal">
        <button
          type="button"
          className={`cert-tab-btn ${activeCategory === 'work' ? 'active' : ''}`}
          aria-selected={activeCategory === 'work'}
          onClick={() => setActiveCategory('work')}
        >
          Skills &amp; Work Experience
        </button>
        <button
          type="button"
          className={`cert-tab-btn ${activeCategory === 'academic' ? 'active' : ''}`}
          aria-selected={activeCategory === 'academic'}
          onClick={() => setActiveCategory('academic')}
        >
          Academic
        </button>
      </div>

      <div className="cert-container">
        {loading ? <div className="loading">Loading credentials...</div> : null}
        {error ? <div className="error-banner">{error}</div> : null}

        {!loading &&
          !error &&
          filteredCredentials.map((credential, index) => {
            const showWorkHeading = activeCategory === 'work' && index === workIntroIndex && workIntroIndex > 0;

            return (
              <div key={credential.id}>
                {showWorkHeading ? (
                  <div className="cert-section-heading reveal">
                    <h2>High School Exposures</h2>
                  </div>
                ) : null}
                <CredentialRow credential={credential} reverse={index % 2 === 1} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
