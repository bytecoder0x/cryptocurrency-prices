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
  </tr>`;
}
