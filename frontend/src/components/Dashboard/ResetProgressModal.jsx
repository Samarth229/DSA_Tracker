import { useState, useEffect } from 'react';
import api from '../../services/api';
import { getErrorMessage } from '../../utils/errorHandler';
import './ResetProgressModal.css';

export default function ResetProgressModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState('confirm');
  const [status, setStatus] = useState(null);
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('confirm');
      setConfirmText('');
      setError('');
      api.get('/user/reset-status').then((res) => setStatus(res.data)).catch(() => {});
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (confirmText !== 'RESET') {
      setError('Please type exactly "RESET" to confirm.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/user/reset-progress', { confirmation: confirmText });
      setStep('success');
      setTimeout(() => { onSuccess(); onClose(); }, 2000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rm-overlay" onClick={onClose}>
      <div className="rm-modal" onClick={(e) => e.stopPropagation()}>

        {step === 'confirm' && (
          <>
            <div className="rm-header">
              <h2>Reset Your Progress?</h2>
              <button className="rm-close" onClick={onClose}>✕</button>
            </div>
            <div className="rm-body">
              <p>This will permanently delete all your DSA learning data.</p>
              {status && (
                <div className="rm-stats">
                  <div className="rm-stat"><span>{status.total_attempts}</span>Attempts logged</div>
                  <div className="rm-stat"><span>{status.topics_practiced}</span>Topics practiced</div>
                  <div className="rm-stat"><span>{status.current_streak}</span>Day streak</div>
                </div>
              )}
              <div className="rm-warning">
                <strong>⚠ This action cannot be undone.</strong>
                <p>All progress, attempts, and strength data will be permanently deleted.</p>
              </div>
            </div>
            <div className="rm-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-danger" onClick={() => setStep('input')}>
                I Understand, Proceed
              </button>
            </div>
          </>
        )}

        {step === 'input' && (
          <>
            <div className="rm-header">
              <h2>Final Confirmation</h2>
              <button className="rm-close" onClick={onClose}>✕</button>
            </div>
            <div className="rm-body">
              <div className="rm-danger-list">
                <p><strong>What will be deleted:</strong></p>
                <ul>
                  <li>✗ All {status?.total_attempts ?? 0} logged attempts</li>
                  <li>✗ All topic progress reset to "Not Started"</li>
                  <li>✗ Your {status?.current_streak ?? 0}-day streak</li>
                  <li>✗ All accuracy and mastery data</li>
                </ul>
              </div>
              <p className="rm-instruction">
                Type <code>RESET</code> below to confirm:
              </p>
              <input
                type="text"
                className="rm-input"
                placeholder="Type RESET here"
                value={confirmText}
                onChange={(e) => { setConfirmText(e.target.value); setError(''); }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleConfirm(); }}
                autoFocus
              />
              {error && <div className="rm-error">{error}</div>}
            </div>
            <div className="rm-footer">
              <button className="btn btn-secondary" onClick={() => setStep('confirm')}>Go Back</button>
              <button
                className="btn btn-danger"
                onClick={handleConfirm}
                disabled={confirmText !== 'RESET' || loading}
              >
                {loading ? 'Resetting...' : 'Confirm Reset'}
              </button>
            </div>
          </>
        )}

        {step === 'success' && (
          <div className="rm-success">
            <div className="rm-checkmark">✓</div>
            <h2>Progress Reset!</h2>
            <p>All data cleared. Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
