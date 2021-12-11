import sprite from '../../img/icons/sprite.svg';
import {
  formatBigNumber,
  formatPercent,
  formatPrice,
  getChangeClass,
} from '../services/helpers';

export function createPoolsMarkup(pools) {
  return pools.map(pool => createPoolMarkup(pool)).join('');
}

// reserves can be very big (shib)
function formatAmount(n) {
  if (n >= 1e12) {
    return (n / 1e12).toFixed(2) + 'T';
  }
  if (n >= 1e9) {
    return (n / 1e9).toFixed(2) + 'B';
  }
  if (n >= 1e6) {
    return (n / 1e6).toFixed(2) + 'M';
  }

  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function createPoolMarkup(pool) {
  const shortAddress = pool.address.slice(0, 6) + '…' + pool.address.slice(-4);

  return `<tr class="pools-item" data-address="${pool.address}">
    <td class="pools-td">
      <div class="pools-pair">
        <span class="pools-pair-name">${pool.token}/WETH</span>
        <span class="pools-pair-fee">0.3%</span>
      </div>
    </td>
    <td class="pools-td">
      <div class="pools-reserves">
        <span class="pools-reserve">${formatAmount(pool.reserveToken)} ${
    pool.token
  }</span>
        <span class="pools-reserve">${formatAmount(
          pool.reserveWeth
        )} WETH</span>
      </div>
    </td>
    <td class="pools-td">${formatPrice(pool.poolPrice)}</td>
    <td class="pools-td">${formatPrice(pool.marketPrice)}</td>
    <td class="pools-td ${getChangeClass(pool.difference)}">${formatPercent(
    pool.difference
  )}</td>
    <td class="pools-td">${formatBigNumber(pool.tvl)}</td>
    <td class="pools-td">
      <a class="pools-link" href="https://etherscan.io/address/${
        pool.address
      }" target="_blank" rel="noopener noreferrer">${shortAddress}<svg class="pools-link-icon" width="14" height="14"><use href="${sprite}#icon-external"></use></svg></a>
    </td>
  </tr>`;
}
