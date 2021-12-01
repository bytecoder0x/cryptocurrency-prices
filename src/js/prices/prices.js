import { getCoinsMarkets } from '../services/coingecko-api';
import { createPricesMarkup } from './markup-prices';

const COIN_IDS = [
  'bitcoin',
  'ethereum',
  'tether',
  'binancecoin',
  'ripple',
  'solana',
  'cardano',
  'dogecoin',
  'polkadot',
  'tron',
  'matic-network',
  'litecoin',
  'wrapped-bitcoin',
  'chainlink',
  'uniswap',
  'dai',
  'shiba-inu',
  'aave',
  'maker',
  'curve-dao-token',
  'compound-governance-token',
  '1inch',
  'havven',
  'yearn-finance',
  'sushi',
];

const list = document.querySelector('.prices-list');

let coins = [];

function loadPrices() {
  getCoinsMarkets(COIN_IDS)
    .then(markets => {
      coins = markets;
      renderPrices();
    })
    .catch(error => {
      console.log(error);
    });
}

function renderPrices() {
  list.innerHTML = createPricesMarkup(coins);
}

loadPrices();
setInterval(loadPrices, 60000);
