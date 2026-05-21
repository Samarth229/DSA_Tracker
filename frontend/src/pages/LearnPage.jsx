import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { getErrorMessage } from '../utils/errorHandler';
import './LearnPage.css';

const DIFFICULTIES = ['easy', 'medium', 'hard'];
const STATUSES = ['solved', 'attempted', 'skipped'];
const AI_SERVICES = ['claude', 'chatgpt', 'other'];

export default function LearnPage() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [prompt, setPrompt] = useState(null);
  const [promptLoading, setPromptLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    attempt_status: 'solved',
    time_taken: '',
    ai_service: 'claude',
    notes: '',
    questions_received: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    api.get(`/topics/${slug}`).then((res) => setTopic(res.data));
  }, [slug]);

  const fetchPrompt = async () => {
    setPromptLoading(true);
    setCopied(false);
    try {
      const res = await api.get(`/topics/${topic.id}/prompt?difficulty=${difficulty}`);
      setPrompt(res.data.prompt);
    } finally {
      setPromptLoading(false);
    }
  };

  const copyPrompt = () => {
    if (prompt?.template_text) {
      navigator.clipboard.writeText(prompt.template_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);
    setSubmitLoading(true);
    try {
      await api.post('/attempts', {
        topic_id: topic.id,
        difficulty_selected: difficulty,
        attempt_status: form.attempt_status,
        time_taken: form.time_taken ? parseInt(form.time_taken) : undefined,
        ai_service: form.ai_service,
        notes: form.notes || undefined,
        questions_received: form.questions_received || undefined,
      });
      setSubmitSuccess(true);
      setForm({ attempt_status: 'solved', time_taken: '', ai_service: 'claude', notes: '', questions_received: '' });
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!topic) return <div className="spinner" />;

  return (
    <div className="container learn-container">
      <Link to={`/topics/${slug}`} className="back-link">← Back to {topic.name}</Link>
      <h1>{topic.name} — Practice Session</h1>

      {/* Step 1: Get prompt */}
      <div className="card step-card">
        <div className="step-label">Step 1</div>
        <h2>Get Questions from AI</h2>
        <p className="step-desc">
          Choose a difficulty, copy the prompt below, and paste it into Claude or ChatGPT. The AI will give you LeetCode-style questions to solve.
        </p>

        <div className="difficulty-selector">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              className={`diff-btn ${difficulty === d ? 'active active-' + d : ''}`}
              onClick={() => { setDifficulty(d); setPrompt(null); }}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        <button className="btn btn-primary" onClick={fetchPrompt} disabled={promptLoading}>
          {promptLoading ? 'Loading...' : 'Generate Prompt'}
        </button>

        {prompt && (
          <div className="prompt-box">
            <div className="prompt-header">
              <span className="prompt-focus">{prompt.focus_area}</span>
              <button className="btn btn-secondary btn-sm" onClick={copyPrompt}>
                {copied ? 'Copied!' : 'Copy Prompt'}
              </button>
            </div>
            <pre className="prompt-text">{prompt.template_text}</pre>
          </div>
        )}
      </div>

      {/* Step 2: Log result */}
      <div className="card step-card">
        <div className="step-label">Step 2</div>
        <h2>Log Your Result</h2>
        <p className="step-desc">After attempting questions, record how it went to track your progress.</p>

        {submitSuccess && (
          <div className="success-banner">
            Result logged! Your strength for {topic.name} has been updated.
            <Link to="/dashboard" style={{ marginLeft: '0.5rem' }}>View dashboard →</Link>
          </div>
        )}
        {submitError && <div className="error-banner">{submitError}</div>}

        <form onSubmit={handleSubmit} className="log-form">
          <div className="form-group">
            <label>How did it go?</label>
            <div className="status-selector">
              {STATUSES.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`status-btn ${form.attempt_status === s ? 'active-' + s : ''}`}
                  onClick={() => setForm({ ...form, attempt_status: s })}
                >
                  {s === 'solved' ? '✓ Solved' : s === 'attempted' ? '~ Attempted' : '✗ Skipped'}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Time spent (minutes)</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 30"
                value={form.time_taken}
                onChange={(e) => setForm({ ...form, time_taken: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>AI service used</label>
              <select value={form.ai_service} onChange={(e) => setForm({ ...form, ai_service: e.target.value })}>
                {AI_SERVICES.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Questions you received (optional)</label>
            <textarea
              rows={4}
              placeholder="Paste the questions the AI gave you..."
              value={form.questions_received}
              onChange={(e) => setForm({ ...form, questions_received: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Notes / observations (optional)</label>
            <textarea
              rows={3}
              placeholder="What was hard? What clicked? Any patterns you noticed?"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitLoading}>
            {submitLoading ? 'Saving...' : 'Log Result'}
          </button>
        </form>
      </div>
    </div>
  );
}
