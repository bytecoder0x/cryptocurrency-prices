import Swal from 'sweetalert2';
import sprite from '../../img/icons/sprite.svg';

export function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLS(key) {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
}

export function formatPrice(price) {
  if (price === null || price === undefined) {
    return '—';
  }

  // small coins like shib need more digits
  if (price > 0 && price < 0.01) {
    return '$' + price.toFixed(6);
  }

  if (price > 0 && price < 1) {
    return '$' + price.toFixed(4);
  }

  return (
    '$' +
    price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

// for market cap
export function formatBigNumber(n) {
  if (n >= 1e12) {
    return '$' + (n / 1e12).toFixed(2) + 'T';
  }
  if (n >= 1e9) {
    return '$' + (n / 1e9).toFixed(2) + 'B';
  }
  if (n >= 1e6) {
    return '$' + (n / 1e6).toFixed(2) + 'M';
  }
  if (n >= 1e3) {
    return '$' + (n / 1e3).toFixed(2) + 'K';
  }

  return '$' + n.toFixed(2);
}

export function formatPercent(n) {
  if (n === null || n === undefined) {
    return '—';
  }

  if (n > 0) {
    return '+' + n.toFixed(2) + '%';
  }

  return n.toFixed(2) + '%';
}

export function getChangeClass(n) {
  if (n === null || n === undefined) {
    return '';
  }

  return n >= 0 ? 'is-up' : 'is-down';
}

export function showError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message || 'Something went wrong!',
  });
}

export function showLoader() {
  document.querySelector('.loader-container').classList.remove('is-hidden');
}

export function hideLoader() {
  // small delay so loader dont blink
  setTimeout(() => {
    document.querySelector('.loader-container').classList.add('is-hidden');
  }, 300);
}

export function getFavorites() {
  return loadFromLS('favorites') || [];
}

export function toggleFavorite(id) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  saveToLS('favorites', favorites);
  updateFavoritesCounter();

  // update all stars of this coin
  const inFavorites = favorites.includes(id);
  const icon = inFavorites ? 'icon-star-filled' : 'icon-star';
  const buttons = document.querySelectorAll(`[data-favorite-id="${id}"]`);

  buttons.forEach(btn => {
    if (inFavorites) {
      btn.classList.add('is-active');
    } else {
      btn.classList.remove('is-active');
    }

    btn.querySelector('use').setAttribute('href', `${sprite}#${icon}`);
  });
}

export function updateFavoritesCounter() {
  const counter = document.querySelector('.favorites-counter');

  counter.textContent = getFavorites().length;
}
