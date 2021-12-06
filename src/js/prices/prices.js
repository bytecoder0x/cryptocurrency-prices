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
const emptyText = document.querySelector('.prices-empty');
const form = document.querySelector('.filters-form');
const updatedEl = document.querySelector('.filters-updated');

let coins = [];

export function loadPrices() {
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
      updatedEl.textContent = new Date().toLocaleTimeString();
    })
    .catch(error => {
      showError();
    })
    .finally(hideLoader);
}

export function renderPrices() {
  const search = form.elements.search.value.trim().toLowerCase();

  let filtredCoins = coins.filter(coin => {
    return (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    );
  });

  list.innerHTML = createPricesMarkup(filtredCoins);

  if (filtredCoins.length === 0) {
    emptyText.classList.remove('is-hidden');
  } else {
    emptyText.classList.add('is-hidden');
  }
}

loadPrices();
setInterval(loadPrices, 60000);
