import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './TopicDetailsPage.css';

const MASTERY_PERCENT = { not_started: 0, learning: 33, confident: 66, mastered: 100 };
const TABS = ['Overview', 'Resources'];

export default function TopicDetailsPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [topic, setTopic] = useState(null);
  const [strength, setStrength] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicRes = await api.get(`/topics/${slug}`);
        setTopic(topicRes.data);

        if (user) {
          try {
            const strengthRes = await api.get(`/dashboard/topic-strength/${slug}`);
            setStrength(strengthRes.data);
          } catch {
            // user has no data for this topic yet
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, user]);

  useEffect(() => {
    setActiveTab('Overview');
  }, [slug]);

  if (loading) return <div className="spinner" />;
  if (!topic) return <div className="container" style={{ paddingTop: '2rem' }}>Topic not found.</div>;

  const masteryPercent = strength ? MASTERY_PERCENT[strength.mastery_level] ?? 0 : 0;

  return (
    <div className="container topic-detail-container">
      <Link to="/topics" className="back-link">← Back to Topics</Link>

      {/* Header */}
      <div className="card topic-hero">
        <div className="topic-hero-top">
          {topic.display_number && (
            <span className="topic-display-num">#{topic.display_number}</span>
          )}
          <span className={`badge badge-${topic.tier.toLowerCase()}`}>{topic.tier}</span>
          <span className="topic-meta-item">⭐ {topic.difficulty_rating}/5 difficulty</span>
          <span className="topic-meta-item">⏱ ~{topic.estimated_hours}h to learn</span>
        </div>
        <h1>{topic.name}</h1>
        <p className="topic-simple-def">{topic.simple_definition}</p>
      </div>

      {/* Tab nav */}
      <div className="tab-nav">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="tab-content" key={activeTab}>

        {/* ── Overview ── */}
        {activeTab === 'Overview' && (
          <div className="tab-panel fade-in">
            <section className="real-world-section">
              <h2>Why Learn {topic.name}?</h2>
              <p className="section-subtitle">
                See how <strong>{topic.name}</strong> powers the apps you use every day:
              </p>
              <div className="use-cases-grid">
                {topic.real_world_uses?.examples?.map((ex, i) => (
                  <div key={i} className="use-case-card card">
                    <div className="use-case-company">{ex.company}</div>
                    <div className="use-case-title">{ex.use_case}</div>
                    <p className="use-case-explanation">{ex.explanation}</p>
                  </div>
                ))}
              </div>
            </section>

            {user && strength && (
              <section className="progress-section card">
                <h3>Your Progress</h3>
                <div className="progress-stats">
                  <div className="stat-box">
                    <div className="stat-value">{strength.solved_count}</div>
                    <div className="stat-label">Solved</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-value">{strength.attempted_count}</div>
                    <div className="stat-label">Attempted</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-value">{strength.accuracy != null ? `${strength.accuracy}%` : '—'}</div>
                    <div className="stat-label">Accuracy</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-value">
                      <span className={`badge badge-${strength.mastery_level}`}>{strength.mastery_level.replace('_', ' ')}</span>
                    </div>
                    <div className="stat-label">Mastery</div>
                  </div>
                </div>
                <div className="mastery-bar" style={{ marginTop: '1rem' }}>
                  <div className="mastery-bar-fill" style={{ width: `${masteryPercent}%` }} />
                </div>
              </section>
            )}

            <div className="topic-cta">
              {user ? (
                <Link to={`/topics/${slug}/learn`} className="btn btn-primary btn-large">
                  Get Questions & Track Progress
                </Link>
              ) : (
                <div className="login-cta card">
                  <p>Sign in to get AI-generated questions and track your progress.</p>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <Link to="/register" className="btn btn-primary">Create account</Link>
                    <Link to="/login" className="btn btn-secondary">Sign in</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Resources ── */}
        {activeTab === 'Resources' && (
          <div className="tab-panel fade-in">
            <section className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Learning Resources</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Study <strong>{topic.name}</strong> with these resources before attempting questions:
              </p>
              <div className="resources-list">
                {topic.reference_url && (
                  <a
                    href={topic.reference_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    <div className="resource-icon">📖</div>
                    <div>
                      <div className="resource-title">GeeksforGeeks Article</div>
                      <div className="resource-sub">In-depth written tutorial with examples and code</div>
                    </div>
                    <span className="resource-arrow">→</span>
                  </a>
                )}
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(topic.youtube_search_query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  <div className="resource-icon">▶</div>
                  <div>
                    <div className="resource-title">YouTube Videos</div>
                    <div className="resource-sub">Visual explanations and walkthroughs</div>
                  </div>
                  <span className="resource-arrow">→</span>
                </a>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
