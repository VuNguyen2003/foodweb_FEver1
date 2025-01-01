import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import '../styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = authService.getCurrentUser()?.username;
        if (!username) {
          throw new Error('User not logged in');
        }
        const data = await authService.getProfile(username);
        setProfile(data);
      } catch (err) {
        setError('Lỗi khi tải thông tin tài khoản');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Đang tải thông tin tài khoản...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <p><strong>Tên người dùng:</strong> {profile.username}</p>
      <p><strong>Họ và tên:</strong> {profile.fullName}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Địa chỉ:</strong> {profile.address}</p>
      {/* Add update profile functionality if needed */}
    </div>
  );
};

export default Profile;