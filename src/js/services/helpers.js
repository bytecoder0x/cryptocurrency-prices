import Swal from 'sweetalert2';

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
