import { getCoinsMarkets } from '../services/coingecko-api';
import { getUniswapPrices, PAIRS } from '../services/uniswap-api';
import { hideLoader, showError, showLoader } from '../services/helpers';
import { createPricesMarkup } from './markup-prices';

const COIN_IDS = [
  ...PAIRS.map(pair => pair.id),
  'bitcoin',
  'binancecoin',
  'ripple',
  'solana',
  'cardano',
  'dogecoin',
  'polkadot',
  'tron',
  'matic-network',
  'litecoin',
];

const list = document.querySelector('.prices-list');

let coins = [];

function loadPrices() {
  showLoader();

  Promise.all([getCoinsMarkets(COIN_IDS), getUniswapPrices()])
    .then(([markets, uniswap]) => {
      // add uniswap price and difference to every coin
      markets.forEach(coin => {
        const uniPrice = uniswap.prices[coin.id];

        if (uniPrice) {
          coin.uniswapPrice = uniPrice;
          coin.difference =
            ((uniPrice - coin.current_price) / coin.current_price) * 100;
        } else {
          coin.uniswapPrice = null;
          coin.difference = null;
        }
      });

      coins = markets;
      renderPrices();
    })
    .catch(error => {
      showError();
    })
    .finally(hideLoader);
}

function renderPrices() {
  list.innerHTML = createPricesMarkup(coins);
}

loadPrices();
setInterval(loadPrices, 60000);
