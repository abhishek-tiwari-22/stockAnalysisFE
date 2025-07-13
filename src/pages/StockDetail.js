import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { stockService } from '../services/stockService';
import { ArrowLeft, Heart } from 'lucide-react';

const StockDetail = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [addingToFavorites, setAddingToFavorites] = useState(false);

    useEffect(() => {
        if (symbol) {
            fetchStockDetail();
        }
    }, [symbol]);

    useEffect(() => {
        if (user && user.id && stock) {
            checkIfFavorite();
        }
    }, [user, stock]);

    const checkIfFavorite = async () => {
        try {
            const favorites = await stockService.getFavoriteStocks(user.id);
            const isFav = favorites.some(favStock => favStock.symbol === stock.symbol);
            setIsFavorite(isFav);
        } catch (error) {
            console.error('Error checking favorites:', error);
        }
    }

    const fetchStockDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await stockService.getStockBySymbol(symbol);
            setStock(data);
        } catch (error) {
            setError('Failed to fetch stock details. Please check if the backend is running.');
            console.error('Error fetching stock detail:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToFavorites = async () => {
        if (!user) {
            alert('Please login to add favorites');
            navigate('/login');
            return;
        }

        try {
            setAddingToFavorites(true);
            if (isFavorite) {
                await stockService.removeFromFavorites(stock.symbol, user.id || 'temp-user-id');
                setIsFavorite(false);
                alert('Removed from favorites');
            } else {
                await stockService.addToFavorites(stock.symbol, user.id || 'temp-user-id');
                setIsFavorite(true);
                alert('Added to favorites');
            }
        } catch (error) {
            alert('Failed to update favorites');
            console.error('Error updating favorites:', error);
        } finally {
            setAddingToFavorites(false);
        }
    };

    // Safe formatting functions
    const formatPrice = (price) => {
        if (price === null || price === undefined || isNaN(price)) return '₹0.00';
        return `₹${Number(price).toFixed(2)}`;
    };

    const formatChange = (change) => {
        if (change === null || change === undefined || isNaN(change)) return '0.00';
        const sign = change >= 0 ? '+' : '';
        return `${sign}${Number(change).toFixed(2)}`;
    };

    const formatPercentage = (percentage) => {
        if (percentage === null || percentage === undefined || isNaN(percentage)) return '0.00%';
        const sign = percentage >= 0 ? '+' : '';
        return `${sign}${Number(percentage).toFixed(2)}%`;
    };

    const formatVolume = (volume) => {
        if (volume === null || volume === undefined || isNaN(volume)) return 'N/A';
        return Number(volume).toLocaleString('en-IN');
    };

    const formatMarketCap = (marketCap) => {
        if (marketCap === null || marketCap === undefined || isNaN(marketCap)) return 'N/A';
        return `₹${(Number(marketCap) / 10000000).toFixed(2)}Cr`;
    };

    if (loading) {
        return <div className="text-center py-8">Loading stock details...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p style={{ color: '#dc2626', marginBottom: '16px' }}>{error}</p>
                <button onClick={fetchStockDetail} className="btn-primary" style={{ marginRight: '8px' }}>
                    Retry
                </button>
                <button onClick={() => navigate('/')} className="btn-secondary">
                    Go Back Home
                </button>
            </div>
        );
    }

    if (!stock) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Stock not found</p>
                <button onClick={() => navigate('/')} className="btn-primary mt-4">
                    Go Back Home
                </button>
            </div>
        );
    }

    const isPositive = (stock.dayChange || 0) >= 0;

    return (
        <div className="container py-8">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                    style={{ textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <ArrowLeft style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    <span>Back</span>
                </button>

                {user && (
                    <button
                        onClick={handleAddToFavorites}
                        disabled={addingToFavorites}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            isFavorite 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'bg-gray-100 text-gray-700 hover: bg-gray-100 text-gray-200'}`}
                        style={{
                            backgroundColor: isFavorite ? '#ef4444' : '#f3f4f6',
                            color: isFavorite ? 'white' : '#374151'
                        }}
                    >
                        <Heart style={{ width: '16px', height: '16px',
                            fill: isFavorite ? 'currentcolor' : 'none'
                         }} />
                        <span>{addingToFavorites ? 'Loading...' : isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                    </button>
                )}
            </div>

            {/* Stock Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                {/* Main Info */}
                <div>
                    <div className="card" style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div>
                                <h1 className="text-3xl font-bold mb-4">{stock.symbol}</h1>
                                <p className="text-gray-600 mb-4">{stock.name}</p>
                                <span
                                    className="stock-sector"
                                    style={{ backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '6px 12px', borderRadius: '20px' }}
                                >
                                    {stock.sector}
                                </span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className="text-3xl font-bold mb-4" style={{ fontSize: '36px' }}>
                                    {formatPrice(stock.currentPrice)}
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        color: isPositive ? '#059669' : '#dc2626',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        marginBottom: '8px'
                                    }}
                                >
                                    <span>{formatChange(stock.dayChange)}</span>
                                </div>
                                <div
                                    style={{
                                        color: isPositive ? '#059669' : '#dc2626',
                                        fontSize: '18px',
                                        fontWeight: '600'
                                    }}
                                >
                                    {formatPercentage(stock.dayChangePercent)}
                                </div>
                            </div>
                        </div>

                        {/* Chart Placeholder */}
                        <div style={{ height: '200px', backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: '#6b7280' }}>Real-time Chart Coming Soon</p>
                        </div>
                    </div>
                </div>

                {/* Side Panel */}
                <div>
                    {/* Key Statistics */}
                    <div className="card" style={{ marginBottom: '24px' }}>
                        <h3 className="font-bold mb-4" style={{ fontSize: '18px' }}>Key Statistics</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6b7280' }}>Open</span>
                                <span style={{ fontWeight: '500' }}>{formatPrice(stock.openPrice)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6b7280' }}>High</span>
                                <span style={{ fontWeight: '500' }}>{formatPrice(stock.highPrice)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6b7280' }}>Low</span>
                                <span style={{ fontWeight: '500' }}>{formatPrice(stock.lowPrice)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6b7280' }}>Previous Close</span>
                                <span style={{ fontWeight: '500' }}>{formatPrice(stock.previousClose)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6b7280' }}>Volume</span>
                                <span style={{ fontWeight: '500' }}>{formatVolume(stock.volume)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6b7280' }}>Market Cap</span>
                                <span style={{ fontWeight: '500' }}>{formatMarketCap(stock.marketCap)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="card">
                        <h3 className="font-bold mb-4" style={{ fontSize: '18px' }}>Last Updated</h3>
                        <p style={{ color: '#6b7280' }}>
                            {stock.lastUpdated ? new Date(stock.lastUpdated).toLocaleString('en-IN') : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetail;