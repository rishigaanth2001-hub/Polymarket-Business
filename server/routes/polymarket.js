import express from 'express';
import { getTopVolumeMarkets, getMarketDetails, getCurrentPrices } from '../services/polymarketService.js';

const router = express.Router();

// Get top 10 high-volume markets per category
router.get('/top-markets', async (req, res) => {
  try {
    console.log('Fetching top markets by category...');
    const markets = await getTopVolumeMarkets();
    
    console.log(`Retrieved markets from ${typeof markets === 'object' && !Array.isArray(markets) ? Object.keys(markets).length : 'unknown'} categories`);

    if (typeof markets !== 'object' || Object.keys(markets).length === 0) {
      console.warn('No markets found - API may be offline or no active markets');
      return res.json({});
    }

    res.json(markets);
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch top markets',
      message: error.message,
      details: error.toString()
    });
  }
});

// Get specific market details
router.get('/market/:marketId', async (req, res) => {
  try {
    const market = await getMarketDetails(req.params.marketId);
    res.json(market);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch market details',
      message: error.message 
    });
  }
});

// Health check - also test API connectivity
router.get('/health', async (req, res) => {
  try {
    console.log('Health check - testing API connectivity...');
    const markets = await getTopVolumeMarkets();
    res.json({ 
      status: 'ok',
      apiConnected: true,
      marketsAvailable: markets.length
    });
  } catch (error) {
    res.json({ 
      status: 'warning',
      apiConnected: false,
      error: error.message
    });
  }
});

export default router;
