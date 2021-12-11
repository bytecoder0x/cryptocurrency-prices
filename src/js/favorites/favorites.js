import { getCoinsMarkets } from '../services/coingecko-api';
import { getUniswapPrices } from '../services/uniswap-api';
import {
  getFavorites,
  hideLoader,
  saveToLS,
  showError,
  showLoader,
  toggleFavorite,
} from '../services/helpers';
import { createPricesMarkup } from '../prices/markup-prices';

const list = document.querySelector('.favorites-list');
const tableWrapper = document.querySelector('.favorites-table-wrapper');
const emptyContent = document.querySelector('.empty-content');

let coins = [];

function showEmpty() {
  emptyContent.classList.remove('is-hidden');
  tableWrapper.classList.add('is-hidden');
}

function renderFavorites() {
  const favorites = getFavorites();
  const favoriteCoins = [];

  coins.forEach(coin => {
    if (favorites.includes(coin.id)) {
      favoriteCoins.push(coin);
    }
  });

  if (favoriteCoins.length === 0) {
    list.innerHTML = '';
    showEmpty();
    return;
  }

  list.innerHTML = createPricesMarkup(favoriteCoins, favorites);
  emptyContent.classList.add('is-hidden');
  tableWrapper.classList.remove('is-hidden');
}

async function loadFavorites() {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    showEmpty();
    return;
  }

  showLoader();

  try {
    const [markets, uniswap] = await Promise.all([
      getCoinsMarkets(favorites),
      getUniswapPrices(),
    ]);

    // same as on home page
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
    saveToLS('coins', coins);
    renderFavorites();
  } catch (error) {
    showError();
  }

  hideLoader();
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-favorite');

  if (btn) {
    toggleFavorite(btn.dataset.favoriteId);
    // remove coin from table
    renderFavorites();
  }
});

loadFavorites();
