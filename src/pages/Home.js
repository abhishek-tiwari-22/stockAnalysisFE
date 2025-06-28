import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import StockCard from '../components/StockCard';
import { stockService } from '../services/stockService';

const Home = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSector, setSelectedSector] = useState('');

    const sectors = [
        'Banking', 'Information Technology', 'Oil & Gas', 'Consumer Goods',
        'Pharmaceuticals', 'Automobile', 'Telecommunications', 'Infrastructure'
    ];

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await stockService.getTop100Stocks();
            setStocks(data);
        } catch (error) {
            setError('Failed to fetch stocks. Please check if the backend is running.');
            console.error('Error fetching stocks:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStocksBySector = async (sector) => {
        if (!sector) {
            fetchStocks();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await stockService.getStocksBySector(sector);
            setStocks(data);
        } catch (error) {
            setError('Failed to fetch stocks by sector.');
            console.error('Error fetching stocks by sector:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSectorChange = (sector) => {
        setSelectedSector(sector);
        fetchStocksBySector(sector);
    };

    if (loading) {
        return <div className="text-center py-8">Loading stocks...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p style={{ color: '#dc2626', marginBottom: '16px' }}>{error}</p>
                <button onClick={fetchStocks} className="btn-primary">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center mb-4">
                    <TrendingUp style={{ width: '32px', height: '32px', marginRight: '8px', color: '#2563eb' }} />
                    <h1 className="text-3xl font-bold text-gray-900">Top Indian Stocks</h1>
                </div>
                <p className="text-gray-600">Discover and analyze the top performing stocks in the Indian market</p>
            </div>

            {/* Sector Filter */}
            <div className="mb-8">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button
                        onClick={() => handleSectorChange('')}
                        className={selectedSector === '' ? 'btn-primary' : 'btn-secondary'}
                        style={{
                            backgroundColor: selectedSector === '' ? '#2563eb' : '#f3f4f6',
                            color: selectedSector === '' ? 'white' : '#374151'
                        }}
                    >
                        All Sectors
                    </button>
                    {sectors.map((sector) => (
                        <button
                            key={sector}
                            onClick={() => handleSectorChange(sector)}
                            className={selectedSector === sector ? 'btn-primary' : 'btn-secondary'}
                            style={{
                                backgroundColor: selectedSector === sector ? '#2563eb' : '#f3f4f6',
                                color: selectedSector === sector ? 'white' : '#374151'
                            }}
                        >
                            {sector}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stocks Grid */}
            {stocks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No stocks found</p>
                </div>
            ) : (
                <div className="grid grid-responsive">
                    {stocks.map((stock) => (
                        <StockCard key={stock.symbol} stock={stock} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;