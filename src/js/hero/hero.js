import {
  getNetworkStats,
  getUniswapPrices,
  PAIRS,
} from '../services/uniswap-api';
import { formatPrice, showError } from '../services/helpers';

const ethPriceEl = document.querySelector('[data-stat="eth-price"]');
const gasPriceEl = document.querySelector('[data-stat="gas-price"]');
const blockNumberEl = document.querySelector('[data-stat="block-number"]');
const poolsCountEl = document.querySelector('[data-stat="pools-count"]');

poolsCountEl.textContent = PAIRS.length;

Promise.all([getNetworkStats(), getUniswapPrices()])
  .then(([network, uniswap]) => {
    ethPriceEl.textContent = formatPrice(uniswap.ethUsd);
    gasPriceEl.textContent = network.gasPriceGwei.toFixed(1) + ' gwei';
    blockNumberEl.textContent = network.blockNumber.toLocaleString('en-US');
  })
  .catch(error => {
    console.log(error);
    showError();
  });
