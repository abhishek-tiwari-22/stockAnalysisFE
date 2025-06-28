import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockChart = ({ priceHistory }) => {
    if (!priceHistory || priceHistory.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500">
                <p>No chart data available</p>
            </div>
        );
    }

    const formatData = priceHistory.map(point => ({
        timestamp: new Date(point.timestamp).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        price: point.price
    }));

    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tick={{ fontSize: 12 }}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        domain={['dataMin - 10', 'dataMax + 10']}
                    />
                    <Tooltip
                        formatter={(value) => [`₹${value.toFixed(2)}`, 'Price']}
                        labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockChart;
