import { ethers } from 'ethers';

const RPC_URL = import.meta.env.VITE_RPC_URL; // infura or alchemy url from .env.local
const PAIR_ABI = [
  'function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
];

// pairs with WETH token0/token1 sorted by adress
export const PAIRS = [
  {
    id: 'ethereum',
    token: 'USDC',
    decimals: 6,
    address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
    wethIsToken0: false,
  },
  {
    id: 'wrapped-bitcoin',
    token: 'WBTC',
    decimals: 8,
    address: '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940',
    wethIsToken0: false,
  },
  {
    id: 'uniswap',
    token: 'UNI',
    decimals: 18,
    address: '0xd3d2E2692501A5c9Ca623199D38826e513033a17',
    wethIsToken0: false,
  },
  {
    id: 'chainlink',
    token: 'LINK',
    decimals: 18,
    address: '0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974',
    wethIsToken0: false,
  },
  {
    id: 'dai',
    token: 'DAI',
    decimals: 18,
    address: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11',
    wethIsToken0: false,
  },
  {
    id: 'tether',
    token: 'USDT',
    decimals: 6,
    address: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852',
    wethIsToken0: true,
  },
  {
    id: 'aave',
    token: 'AAVE',
    decimals: 18,
    address: '0xDFC14d2Af169B0D36C4EFF567Ada9b2E0CAE044f',
    wethIsToken0: false,
  },
  {
    id: 'maker',
    token: 'MKR',
    decimals: 18,
    address: '0xC2aDdA861F89bBB333c90c492cB837741916A225',
    wethIsToken0: false,
  },
  {
    id: 'havven',
    token: 'SNX',
    decimals: 18,
    address: '0x43AE24960e5534731Fc831386c07755A2dc33D47',
    wethIsToken0: false,
  },
  {
    id: 'sushi',
    token: 'SUSHI',
    decimals: 18,
    address: '0xCE84867c3c02B05dc570d0135103d3fB9CC19433',
    wethIsToken0: false,
  },
  {
    id: 'yearn-finance',
    token: 'YFI',
    decimals: 18,
    address: '0x2fDbAdf3C4D5A8666Bc06645B8358ab803996E28',
    wethIsToken0: false,
  },
  {
    id: 'compound-governance-token',
    token: 'COMP',
    decimals: 18,
    address: '0xCFfDdeD873554F362Ac02f8Fb1f02E5ada10516f',
    wethIsToken0: false,
  },
  {
    id: 'shiba-inu',
    token: 'SHIB',
    decimals: 18,
    address: '0x811beEd0119b4AfCE20D2583EB608C6F7AF1954f',
    wethIsToken0: false,
  },
  {
    id: 'curve-dao-token',
    token: 'CRV',
    decimals: 18,
    address: '0x3dA1313aE46132A397D90d95B1424A9A7e3e0fCE',
    wethIsToken0: true,
  },
  {
    id: '1inch',
    token: '1INCH',
    decimals: 18,
    address: '0x26aAd2da94C59524ac0D93F6D6Cbf9071d7086f2',
    wethIsToken0: false,
  },
];

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// get reserves from pool
async function getPairData(pair) {
  const contract = new ethers.Contract(pair.address, PAIR_ABI, provider);
  const reserves = await contract.getReserves();
  let wethReserve = reserves.reserve1;
  let tokenReserve = reserves.reserve0;

  if (pair.wethIsToken0) {
    wethReserve = reserves.reserve0;
    tokenReserve = reserves.reserve1;
  }

  // weth always have 18 decimals
  const reserveWeth = Number(ethers.utils.formatUnits(wethReserve, 18));
  const reserveToken = Number(
    ethers.utils.formatUnits(tokenReserve, pair.decimals)
  );

  return {
    id: pair.id,
    token: pair.token,
    address: pair.address,
    reserveWeth: reserveWeth,
    reserveToken: reserveToken,
    ethPriceInToken: reserveToken / reserveWeth,
  };
}

function getPairsData() {
  return Promise.all(PAIRS.map(pair => getPairData(pair)));
}

// eth price from usdc pool, other coins through eth
export function getUniswapPrices() {
  return getPairsData().then(pairs => {
    const ethUsd = pairs.find(pair => pair.id === 'ethereum').ethPriceInToken;
    const prices = {};

    pairs.forEach(pair => {
      if (pair.id === 'ethereum') {
        prices[pair.id] = ethUsd;
      } else {
        prices[pair.id] = ethUsd / pair.ethPriceInToken;
      }
    });

    return { ethUsd, prices, pairs };
  });
}

export async function getNetworkStats() {
  const blockNumber = await provider.getBlockNumber();
  const gasPrice = await provider.getGasPrice();

  return {
    blockNumber,
    gasPriceGwei: Number(ethers.utils.formatUnits(gasPrice, 'gwei')),
  };
}
