import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ResetProgressModal from '../components/Dashboard/ResetProgressModal';
import './DashboardPage.css';

const MASTERY_PERCENT = { not_started: 0, learning: 33, confident: 66, mastered: 100 };

function StatCard({ label, value, color }) {
  return (
    <div className="stat-card card">
      <div className="stat-card-value" style={{ color }}>{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}

function TopicStrengthRow({ ts }) {
  const pct = MASTERY_PERCENT[ts.mastery_level] ?? 0;
  return (
    <Link to={`/topics/${ts.topic_slug}/learn`} className="ts-row">
      <div className="ts-info">
        <span className="ts-name">{ts.topic_name}</span>
        <span className={`badge badge-${ts.tier?.toLowerCase()}`}>{ts.tier}</span>
        {ts.is_weak_topic && <span className="weak-tag">Weak</span>}
      </div>
      <div className="ts-stats">
        <span>{ts.solved_count}/{ts.attempted_count} solved</span>
        <span>{ts.accuracy != null ? `${ts.accuracy}%` : '—'}</span>
        <span className={`badge badge-${ts.mastery_level}`}>{ts.mastery_level.replace('_', ' ')}</span>
      </div>
      <div className="mastery-bar ts-bar">
        <div className="mastery-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReset, setShowReset] = useState(false);

  const loadDashboard = () => {
    setLoading(true);
    api.get('/dashboard').then((res) => setData(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { loadDashboard(); }, []);

  if (loading) return <div className="spinner" />;

  const stats = data?.stats;

  return (
    <div className="container dashboard-container">
      <div className="dashboard-top-header">
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Welcome back, {user?.email}
          </p>
        </div>
        <button className="btn btn-reset" onClick={() => setShowReset(true)}>
          Reset Progress
        </button>
      </div>

      <ResetProgressModal
        isOpen={showReset}
        onClose={() => setShowReset(false)}
        onSuccess={loadDashboard}
      />

      {/* Stats overview */}
      <div className="grid-3">
        <StatCard label="Total Solved" value={stats?.total_solved ?? 0} color="var(--success)" />
        <StatCard label="Total Attempted" value={stats?.total_attempted ?? 0} color="var(--primary)" />
        <StatCard label="Topics Practiced" value={stats?.topics_touched ?? 0} color="var(--secondary)" />
      </div>

      {/* Weak topics */}
      {data?.weak_topics?.length > 0 && (
        <section className="weak-section card">
          <h2>Areas to Focus On</h2>
          <p className="section-note">These topics have below 50% accuracy — prioritize them!</p>
          <div className="weak-list">
            {data.weak_topics.map((t) => (
              <Link key={t.topic_id} to={`/topics/${t.topic_slug}/learn`} className="weak-item">
                <span className="weak-name">{t.topic_name}</span>
                <span className="weak-acc">{t.accuracy}% accuracy</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All topic strengths */}
      <section>
        <h2 style={{ marginBottom: '1rem' }}>All Topics</h2>
        {data?.topic_strengths?.length === 0 ? (
          <div className="card empty-state">
            <p>No attempts yet. <Link to="/topics">Browse topics</Link> and start practicing!</p>
          </div>
        ) : (
          <div className="card ts-list">
            {data.topic_strengths.map((ts) => (
              <TopicStrengthRow key={ts.topic_id} ts={ts} />
            ))}
          </div>
        )}
      </section>

      {/* Recent attempts */}
      {data?.recent_attempts?.length > 0 && (
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Recent Activity</h2>
          <div className="card">
            {data.recent_attempts.map((a) => (
              <div key={a.id} className="attempt-row">
                <div className="attempt-info">
                  <span className="attempt-topic">{a.topic_name}</span>
                  <span className={`badge badge-${a.attempt_status === 'solved' ? 'mastered' : a.attempt_status === 'attempted' ? 'learning' : 'not_started'}`}>
                    {a.attempt_status}
                  </span>
                  <span className="attempt-diff">{a.difficulty_selected}</span>
                </div>
                <span className="attempt-time">
                  {a.time_taken ? `${a.time_taken}m` : ''} · {new Date(a.timestamp_started).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/topics" className="btn btn-primary">Practice More Topics</Link>
      </div>
    </div>
  );
}
