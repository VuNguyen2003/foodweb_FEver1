import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import '../styles/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState({
        username: '',
        fullName: '',
        email: '',
        address: '',
        password: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const username = authService.getCurrentUser()?.username;
            if (!username) {
                throw new Error('User not logged in');
            }
            await authService.updateProfile(username, profile);
            setSuccess('Cập nhật thông tin thành công!');
        } catch (err) {
            setError('Lỗi khi cập nhật thông tin tài khoản');
        }
    };

    if (loading) {
        return <p>Đang tải thông tin tài khoản...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="profile-container">
            <h2>Thông tin cá nhân</h2>
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên người dùng:</label>
                    <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Họ và tên:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu mới:</label>
                    <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Cập nhật thông tin</button>
            </form>
        </div>
    );
};

export default Profile;
