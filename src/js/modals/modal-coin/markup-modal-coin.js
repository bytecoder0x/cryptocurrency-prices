import sprite from '../../../img/icons/sprite.svg';
import { PAIRS } from '../../services/uniswap-api';
import {
  formatBigNumber,
  formatPercent,
  formatPrice,
  getChangeClass,
} from '../../services/helpers';

function createStatMarkup(label, value, className) {
  return `<li class="modal-coin-stats-item">
      <span class="modal-coin-stats-label">${label}</span>
      <span class="modal-coin-stats-value ${className || ''}">${value}</span>
    </li>`;
}

export function createModalCoinMarkup(coin, inFavorites) {
  const starIcon = inFavorites ? 'icon-star-filled' : 'icon-star';
  const activeClass = inFavorites ? ' is-active' : '';
  const change7d = coin.price_change_percentage_7d_in_currency;
  let onchainMarkup = '';

  if (coin.uniswapPrice) {
    const pair = PAIRS.find(pair => pair.id === coin.id);
    const shortAddress =
      pair.address.slice(0, 6) + '…' + pair.address.slice(-4);
    const link = `<a class="pools-link" href="https://etherscan.io/address/${pair.address}" target="_blank" rel="noopener noreferrer">${shortAddress}<svg class="pools-link-icon" width="14" height="14"><use href="${sprite}#icon-external"></use></svg></a>`;

    onchainMarkup = `<div class="modal-coin-onchain">
    <h4 class="modal-coin-onchain-title">Uniswap V2 pool</h4>
    <ul class="modal-coin-stats">
      ${createStatMarkup('Pool price', formatPrice(coin.uniswapPrice))}
      ${createStatMarkup(
        'Difference',
        formatPercent(coin.difference),
        getChangeClass(coin.difference)
      )}
      ${createStatMarkup('Contract', link)}
    </ul>
  </div>`;
  }

  return `<div class="modal-coin-header">
    <img class="modal-coin-img" src="${coin.image}" alt="${
    coin.name
  }" width="48" height="48" />
    <div class="modal-coin-heading">
      <h3 class="modal-coin-name">${
        coin.name
      } <span class="modal-coin-symbol">${coin.symbol.toUpperCase()}</span></h3>
      <p class="modal-coin-rank">Rank #${coin.market_cap_rank || '—'}</p>
    </div>
    <button class="btn-favorite modal-coin-favorite${activeClass}" type="button" data-favorite-id="${
    coin.id
  }" aria-label="Add or remove from favorites">
      <svg class="btn-favorite-icon" width="24" height="24">
        <use href="${sprite}#${starIcon}"></use>
      </svg>
    </button>
  </div>
  <div class="modal-coin-price">
    <span class="modal-coin-price-value">${formatPrice(
      coin.current_price
    )}</span>
    <span class="modal-coin-price-change ${getChangeClass(
      coin.price_change_percentage_24h
    )}">${formatPercent(coin.price_change_percentage_24h)}</span>
  </div>
  <canvas class="modal-coin-chart" width="520" height="140"></canvas>
  <p class="modal-coin-chart-label">Last 7 days</p>
  <ul class="modal-coin-stats">
    ${createStatMarkup('Market cap', formatBigNumber(coin.market_cap))}
    ${createStatMarkup('24h volume', formatBigNumber(coin.total_volume))}
    ${createStatMarkup('24h high', formatPrice(coin.high_24h))}
    ${createStatMarkup('24h low', formatPrice(coin.low_24h))}
    ${createStatMarkup(
      '7d change',
      formatPercent(change7d),
      getChangeClass(change7d)
    )}
    ${createStatMarkup('All-time high', formatPrice(coin.ath))}
  </ul>
  ${onchainMarkup}`;
}
