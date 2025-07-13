import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Heart, User, LogOut, TrendingUp } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
      
    return (
        <nav>
            <div className="nav-container">
                <Link to="/" className="nav-brand">
                    <TrendingUp />
                    <span>StockAnalysis</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/search" className="nav-link">
                        <Search />
                        <span>Search</span>
                    </Link>
                    {user && (
                        <Link to="/favorites" className="nav-link">
                            <Heart />
                            <span>Favorites</span>
                        </Link>
                    )}
                    
                    {/* User Authentication Section */}
                    {user ? (
                        // Show when user is logged in
                        <div className="nav-links">
                            <div className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                                <User style={{width: '16px', height: '16px', marginRight: '4px'}} />
                                <span>Welcome, {user.username}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="nav-link"
                                style={{
                                    background: 'none', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#374151',
                                    textDecoration: 'none'
                                }}
                            >
                                <LogOut style={{width: '16px', height: '16px', marginRight: '4px'}} />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        // Show when user is NOT logged in
                        <div className="nav-links">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;