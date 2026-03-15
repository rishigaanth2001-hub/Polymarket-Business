import axios from 'axios';

const GAMMA_API_BASE = 'https://gamma-api.polymarket.com';

// Fetch all markets from Polymarket Gamma API
export async function getAllMarkets() {
  try {
    // Fetch active, non-closed markets from Gamma API
    const response = await axios.get(`${GAMMA_API_BASE}/markets`, {
      params: {
        active: true,
        closed: false,
        limit: 100
      }
    });
    
    // Gamma API returns direct array of markets
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching markets from Gamma API:', error.message);
    throw error;
  }
}

// Get top 10 high volume markets for each category/tag
export async function getTopVolumeMarkets() {
  try {
    // Popular categories/tags on Polymarket
    const categories = ['Sports', 'Crypto', 'Politics', 'Entertainment', 'Science', 'Weather'];
    
    const marketsByCategory = {};

    // Fetch markets for each category
    for (const category of categories) {
      try {
        const response = await axios.get(`${GAMMA_API_BASE}/markets`, {
          params: {
            active: true,
            closed: false,
            tag: category,
            limit: 100
          },
          timeout: 5000
        });

        let markets = Array.isArray(response.data) ? response.data : [];

        // Filter and map markets data
        const filtered = markets
          .map(m => {
            // Parse outcome prices if it's a string
            let prices = [];
            try {
              if (typeof m.outcomePrices === 'string') {
                prices = JSON.parse(m.outcomePrices);
              } else if (Array.isArray(m.outcomePrices)) {
                prices = m.outcomePrices;
              }
            } catch (e) {
              prices = [];
            }

            // Parse outcomes if it's a string
            let outcomes = [];
            try {
              if (typeof m.outcomes === 'string') {
                outcomes = JSON.parse(m.outcomes);
              } else if (Array.isArray(m.outcomes)) {
                outcomes = m.outcomes;
              }
            } catch (e) {
              outcomes = [];
            }

            // Map price values to outcomes
            const outcomesList = outcomes.map((outcome, idx) => ({
              name: outcome,
              price: prices[idx] ? parseFloat(prices[idx]) : 0.5,
              prob: prices[idx] ? parseFloat(prices[idx]) : 0.5
            }));

            return {
              id: m.id,
              question: m.question || 'Unknown Market',
              category: category,
              volume24hr: m.volume24hr || 0,
              volume: m.volumeNum || 0,
              creationTime: m.createdAt || new Date().toISOString(),
              active: m.active,
              closed: m.closed,
              outcomes: outcomesList,
              description: m.description || ''
            };
          });

        // Sort by 24-hour volume and get top 10
        const topMarkets = filtered
          .sort((a, b) => b.volume24hr - a.volume24hr)
          .slice(0, 10);

        if (topMarkets.length > 0) {
          marketsByCategory[category] = topMarkets;
        }
      } catch (error) {
        console.warn(`Error fetching ${category} markets:`, error.message);
        // Continue to next category on error
      }
    }

    const totalMarkets = Object.values(marketsByCategory).reduce((sum, cats) => sum + cats.length, 0);
    const categoriesCount = Object.keys(marketsByCategory).length;
    console.log(`Found ${totalMarkets} active markets across ${categoriesCount} categories`);
    
    return marketsByCategory;
  } catch (error) {
    console.error('Error getting top volume markets:', error.message);
    throw error;
  }
}

// Get market details with current prices
export async function getMarketDetails(marketId) {
  try {
    const response = await axios.get(`${GAMMA_API_BASE}/markets/${marketId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching market details:', error.message);
    throw error;
  }
}

// Get order book / prices for a market
export async function getOrderBook(tokenId) {
  try {
    // Token IDs may not work directly with Gamma API
    // Try to get market and find token info
    console.warn('getOrderBook called with tokenId:', tokenId);
    return null;
  } catch (error) {
    console.error('Error fetching order book:', error.message);
    return null;
  }
}

// Get market group/category info
export async function getMarketConditions(marketId) {
  try {
    const response = await axios.get(`${GAMMA_API_BASE}/markets/${marketId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching market conditions:', error.message);
    return null;
  }
}

// Fetch current prices for multiple outcomes
export async function getCurrentPrices(marketId) {
  try {
    const market = await getMarketDetails(marketId);
    if (market && market.outcomes) {
      let prices = [];
      try {
        if (typeof market.outcomePrices === 'string') {
          prices = JSON.parse(market.outcomePrices);
        } else if (Array.isArray(market.outcomePrices)) {
          prices = market.outcomePrices;
        }
      } catch (e) {
        prices = [];
      }

      let outcomes = [];
      try {
        if (typeof market.outcomes === 'string') {
          outcomes = JSON.parse(market.outcomes);
        } else if (Array.isArray(market.outcomes)) {
          outcomes = market.outcomes;
        }
      } catch (e) {
        outcomes = [];
      }

      return outcomes.map((outcome, idx) => ({
        name: outcome,
        price: prices[idx] ? parseFloat(prices[idx]) : 0.5,
        prob: prices[idx] ? parseFloat(prices[idx]) : 0.5
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching current prices:', error.message);
    return [];
  }
}
