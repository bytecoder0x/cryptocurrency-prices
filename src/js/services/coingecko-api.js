import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export function getCoinsMarkets(ids) {
  return axios
    .get(BASE_URL + '/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: ids.join(','),
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: true,
        price_change_percentage: '24h,7d',
      },
    })
    .then(res => res.data);
}
