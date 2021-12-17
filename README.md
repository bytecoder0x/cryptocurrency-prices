# cryptocurrency-prices

## Description

This repository contains a web application that shows the current prices of popular cryptocurrencies from the CoinGecko API and from Uniswap V2 pools on Ethereum mainnet. The on-chain price is calculated from the pool reserves, so you can see the difference between the exchange and the DEX. Favorites are saved in local storage. For the on-chain prices you need an Ethereum RPC url (Infura, Alchemy) in `.env.local`, see `.env.example`.

## Key Features

- Prices, 24h change and market cap from the CoinGecko API.
- On-chain prices from Uniswap V2 pools and the difference from the market price.
- Pools page with reserves and TVL of every pool.
- Coin modal with a price chart for the last 7 days.
- Search, sorting and favorites list.
- Adaptive design that adjusts to different devices and screens.

## Technologies

- HTML
- CSS
- JavaScript
- Vite
- Ethers.js
- CoinGecko API
- Uniswap V2
