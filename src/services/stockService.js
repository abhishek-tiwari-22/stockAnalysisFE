import api from './api';

export const stockService = {
    // Get top 100 stocks
    getTop100Stocks: async () => {
        try {
            const response = await api.get('/stocks/top100');
            return response.data;
        } catch (error) {
            console.error('Error fetching top 100 stocks:', error);
            throw error;
        }
    },

    // Get stock by symbol
    getStockBySymbol: async (symbol) => {
        try {
            const response = await api.get(`/stocks/${symbol}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching stock details:', error);
            throw error;
        }
    },

    // Search stocks
    searchStocks: async (query) => {
        try {
            const response = await api.get(`/stocks/search?query=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching stocks:', error);
            throw error;
        }
    },

    // Get stocks by sector
    getStocksBySector: async (sector) => {
        try {
            const response = await api.get(`/stocks/sector/${sector}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching stocks by sector:', error);
            throw error;
        }
    },

    // Add to favorites
    addToFavorites: async (stockSymbol, userId) => {
        try {
            const response = await api.post(`/stocks/favorites/${stockSymbol}?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error adding to favorites:', error);
            throw error;
        }
    },

    // Remove from favorites
    removeFromFavorites: async (stockSymbol, userId) => {
        try {
            const response = await api.delete(`/stocks/favorites/${stockSymbol}?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error removing from favorites:', error);
            throw error;
        }
    },

    // Get favorite stocks
    getFavoriteStocks: async (userId) => {
        try {
            const response = await api.get(`/stocks/favorites?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching favorite stocks:', error);
            throw error;
        }
    }
};