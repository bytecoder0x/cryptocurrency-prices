# cryptocurrency-prices

## Description

This repository contains a web application that shows the current prices of popular cryptocurrencies from two sources: the CoinGecko API and directly from the Uniswap V2 pools on Ethereum mainnet. The on-chain price is calculated from the reserves of the pool, so you can see the difference between the market price and the price in the DEX. There are three pages: Home with the prices table, Pools with the reserves and TVL of every pool and Favorites with the coins that you saved in local storage.

## Key Features

- Prices, 24h change and market cap from the CoinGecko API.
- On-chain prices from 15 Uniswap V2 pools and the difference from the market price.
- Pools page with reserves, TVL and a link to Etherscan for every pool.
- Coin modal with a price chart for the last 7 days.
- Search, sorting and a filter for coins with a Uniswap pool.
- Favorites list saved in local storage.
- Automatic update of the prices every minute.
- Adaptive design that adjusts to different devices and screens.

## Technologies

- HTML
- CSS
- JavaScript
- Vite
- Axios
- Ethers.js
- Lodash
- SweetAlert2
- Anime.js
- CoinGecko API
- Uniswap V2
