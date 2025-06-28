import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { stockService } from '../services/stockService';
import StockCard from '../components/StockCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Favorites = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [favoriteStocks, setFavoriteStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchFavoriteStocks();
    }, [user, navigate]);

    const fetchFavoriteStocks = async () => {
        try {
            setLoading(true);
            const data = await stockService.getFavoriteStocks(user.id);
            setFavoriteStocks(data);
        } catch (error) {
            toast.error('Failed to fetch favorite stocks');
            console.error('Error fetching favorite stocks:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                    <Heart className="h-8 w-8 text-red-500" />
                    <h1 className="text-3xl font-bold text-gray-900">
                        Your Favorite Stocks
                    </h1>
                </div>
                <p className="text-gray-600">
                    Keep track of your favorite stocks and monitor their performance
                </p>
            </div>

            {/* Stocks Grid */}
            {favoriteStocks.length === 0 ? (
                <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-4">No favorite stocks yet</p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary"
                    >
                        Browse Stocks
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoriteStocks.map((stock) => (
                        <StockCard key={stock.symbol} stock={stock} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
