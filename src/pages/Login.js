import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TrendingUp } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData);
    
    if (result.success) {
      alert('Login successful!');
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
          <TrendingUp style={{width: '48px', height: '48px', margin: '0 auto', color: '#2563eb'}} />
          <h2 className="text-3xl font-bold text-gray-900" style={{marginTop: '16px'}}>Sign in</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              required
              className="input-field"
              placeholder="Username or email"
              value={formData.usernameOrEmail}
              onChange={(e) => setFormData({...formData, usernameOrEmail: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              required
              className="input-field"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-primary" style={{width: '100%'}} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <p className="text-center" style={{marginTop: '16px'}}>
            Don't have an account? <Link to="/register" style={{color: '#2563eb'}}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;