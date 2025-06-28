import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Search, Heart } from 'lucide-react';

const Navbar = () => {
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
                    <Link to="/favorites" className="nav-link">
                        <Heart />
                        <span>Favorites</span>
                    </Link>
                    <div className="nav-links">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                        <Link to="/register" className="btn-primary">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;