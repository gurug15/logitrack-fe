import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth';
import Button from './Button';
import Input from './Input';
import axios from '../../api/axios';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, role } = useAuth();
  const [showReset, setShowReset] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      // Adjust endpoint as per your backend
      await axios.post('/auth/reset-password', {
        userId: user?._id,
        oldPassword,
        newPassword,
      });
      setSuccess('Password reset successful!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowReset(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ background: '#fff', borderRadius: 8, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: '0 2px 16px rgba(0,0,0,0.2)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>&times;</button>
        <h2 style={{ marginBottom: 16 }}>Profile Information</h2>
        <div style={{ marginBottom: 16 }}>
          <div><b>Name:</b> {user?.name || user?.fullName}</div>
          <div><b>Email:</b> {user?.email}</div>
          {role === 'admin' && (
            <>
              <div><b>Role:</b> Admin</div>
              <div><b>Contact:</b> {user?.contact || '-'}</div>
            </>
          )}
          {role === 'subadmin' && (
            <>
              <div><b>Role:</b> Subadmin</div>
              <div><b>Center:</b> {user?.centerName || '-'}</div>
              <div><b>Contact:</b> {user?.contact || '-'}</div>
            </>
          )}
        </div>
        {showReset ? (
          <form onSubmit={handleResetPassword} style={{ marginBottom: 16 }}>
            <Input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
            <div style={{ display: 'flex', gap: 8 }}>
              <Button type="submit" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</Button>
              <Button type="button" onClick={() => setShowReset(false)} variant="secondary">Cancel</Button>
            </div>
          </form>
        ) : (
          <Button onClick={() => setShowReset(true)} style={{ marginBottom: 8 }}>Reset Password</Button>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
