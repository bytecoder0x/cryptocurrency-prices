import {
  formatBigNumber,
  formatPercent,
  formatPrice,
  getChangeClass,
} from '../services/helpers';

export function createPricesMarkup(coins) {
  let markup = '';

  coins.forEach(coin => {
    markup += createCoinMarkup(coin);
  });

  return markup;
}

function createCoinMarkup(coin) {
  let uniswapPrice = '<span class="prices-empty-value">—</span>';
  let difference = '<span class="prices-empty-value">—</span>';

  // not all coins have pool on uniswap
  if (coin.uniswapPrice) {
    uniswapPrice = formatPrice(coin.uniswapPrice);
    difference = formatPercent(coin.difference);
  }

  return `<tr class="prices-item">
    <td class="prices-td prices-rank">${coin.market_cap_rank || '—'}</td>
    <td class="prices-td">
      <div class="prices-coin">
        <img class="prices-coin-img" src="${coin.image}" alt="${
    coin.name
  }" width="28" height="28" loading="lazy" />
        <span class="prices-coin-name">${coin.name}</span>
        <span class="prices-coin-symbol">${coin.symbol.toUpperCase()}</span>
      </div>
    </td>
    <td class="prices-td">${formatPrice(coin.current_price)}</td>
    <td class="prices-td ${getChangeClass(
      coin.price_change_percentage_24h
    )}">${formatPercent(coin.price_change_percentage_24h)}</td>
    <td class="prices-td">${formatBigNumber(coin.market_cap)}</td>
    <td class="prices-td">${uniswapPrice}</td>
    <td class="prices-td ${getChangeClass(coin.difference)}">${difference}</td>
  </tr>`;
}
