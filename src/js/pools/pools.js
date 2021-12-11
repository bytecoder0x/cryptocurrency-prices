import { getCoinsMarkets } from '../services/coingecko-api';
import { getNetworkStats, getPairsData, PAIRS } from '../services/uniswap-api';
import {
  formatBigNumber,
  formatPrice,
  hideLoader,
  showError,
  showLoader,
} from '../services/helpers';
import { createPoolsMarkup } from './markup-pools';

const list = document.querySelector('.pools-list');
const tvlEl = document.querySelector('[data-summary="tvl"]');
const ethPriceEl = document.querySelector('[data-summary="eth-price"]');
const blockNumberEl = document.querySelector('[data-summary="block-number"]');

showLoader();

Promise.all([
  getPairsData(),
  getCoinsMarkets(PAIRS.map(pair => pair.id)),
  getNetworkStats(),
])
  .then(([pairs, markets, network]) => {
    const ethUsd = pairs.find(pair => pair.id === 'ethereum').ethPriceInToken;
    const ethMarketPrice = markets.find(
      coin => coin.id === 'ethereum'
    ).current_price;
    const pools = [];
    let totalTvl = 0;

    pairs.forEach(pair => {
      const coin = markets.find(coin => coin.id === pair.id);
      let poolPrice = ethUsd / pair.ethPriceInToken;
      let marketPrice = null;
      let difference = null;

      if (pair.id === 'ethereum') {
        poolPrice = pair.ethPriceInToken;
      }

      if (coin) {
        marketPrice = coin.current_price;
        difference = ((poolPrice - marketPrice) / marketPrice) * 100;
      }

      // for eth pool token is usdc so price is 1
      let tokenPrice = marketPrice || poolPrice;
      if (pair.id === 'ethereum') {
        tokenPrice = 1;
      }

      // tvl = token reserve * price + weth reserve * eth price
      const tvl =
        pair.reserveToken * tokenPrice + pair.reserveWeth * ethMarketPrice;
      totalTvl += tvl;

      pools.push({
        ...pair,
        poolPrice,
        marketPrice,
        difference,
        tvl,
      });
    });

    // biggest pools first
    pools.sort((a, b) => b.tvl - a.tvl);

    list.innerHTML = createPoolsMarkup(pools);
    tvlEl.textContent = formatBigNumber(totalTvl);
    ethPriceEl.textContent = formatPrice(ethUsd);
    blockNumberEl.textContent = network.blockNumber.toLocaleString('en-US');
  })
  .catch(error => {
    console.log(error);
    showError();
  })
  .finally(hideLoader);
