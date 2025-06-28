import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StockCard = ({ stock }) => {
  // Safe value extraction with defaults
  const currentPrice = stock?.currentPrice || 0;
  const dayChange = stock?.dayChange || 0;
  const dayChangePercent = stock?.dayChangePercent || 0;
  const symbol = stock?.symbol || 'N/A';
  const name = stock?.name || 'Unknown Company';
  const sector = stock?.sector || 'Others';

  const isPositive = dayChange >= 0;

  const formatPrice = (price) => {
    return `₹${Number(price).toFixed(2)}`;
  };

  const formatChange = (change) => {
    return `₹${Math.abs(Number(change)).toFixed(2)}`;
  };

  const formatPercentage = (percentage) => {
    const sign = percentage > 0 ? '+' : '';
    return `${sign}${Number(percentage).toFixed(2)}%`;
  };

  return (
    <Link to={`/stock/${symbol}`} className="stock-card">
      <div className="card">
        <div className="stock-header">
          <div className="stock-info">
            <h3>{symbol}</h3>
            <p>{name}</p>
            <span className="stock-sector">{sector}</span>
          </div>
          <div className="stock-price">
            <div className="current">{formatPrice(currentPrice)}</div>
            <div className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? (
                <TrendingUp style={{width: '16px', height: '16px'}} />
              ) : (
                <TrendingDown style={{width: '16px', height: '16px'}} />
              )}
              <span>{formatChange(dayChange)}</span>
            </div>
            <div className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
              {formatPercentage(dayChangePercent)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StockCard;