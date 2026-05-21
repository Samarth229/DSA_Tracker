import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './TopicBrowserPage.css';

const TIERS = ['All', 'Basic', 'Advanced'];

export default function TopicBrowserPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTier, setActiveTier] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/topics').then((res) => setTopics(res.data)).finally(() => setLoading(false));
  }, []);

  const filtered = topics.filter((t) => {
    const matchTier = activeTier === 'All' || t.tier === activeTier;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchTier && matchSearch;
  });

  if (loading) return <div className="spinner" />;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="page-header">
        <h1>DSA Topics</h1>
        <p>Learn each topic, get AI-generated questions, and track your progress</p>
      </div>

      <div className="browser-controls">
        <input
          type="search"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="tier-filters">
          {TIERS.map((t) => (
            <button
              key={t}
              className={`filter-btn ${activeTier === t ? 'active' : ''}`}
              onClick={() => setActiveTier(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '3rem' }}>
          No topics found.
        </p>
      ) : (
        <div className="topics-grid">
          {filtered.map((topic, i) => (
            <Link
              to={`/topics/${topic.slug}`}
              key={topic.id}
              className="topic-card card"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="topic-card-header">
                <span className={`badge badge-${topic.tier.toLowerCase()}`}>{topic.tier}</span>
                <span className="topic-order">
                  {topic.display_number ? `#${topic.display_number}` : `#${topic.order_in_sequence}`}
                </span>
              </div>
              <h3 className="topic-name">{topic.name}</h3>
              <p className="topic-definition">{topic.simple_definition.substring(0, 100)}…</p>
              <div className="topic-meta">
                <span>⭐ {topic.difficulty_rating}/5</span>
                <span>⏱ ~{topic.estimated_hours}h</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
