import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TrendingUp } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await register(formData);

        if (result.success) {
            alert('Registration successful!');
            navigate('/');
        } else {
            alert(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <div className="text-center mb-8">
                    <TrendingUp style={{ width: '48px', height: '48px', margin: '0 auto', color: '#2563eb' }} />
                    <h2 className="text-3xl font-bold text-gray-900" style={{ marginTop: '16px' }}>Create account</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <input
                            type="text"
                            className="input-field"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                    <p className="text-center" style={{ marginTop: '16px' }}>
                        Already have an account? <Link to="/login" style={{ color: '#2563eb' }}>Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;