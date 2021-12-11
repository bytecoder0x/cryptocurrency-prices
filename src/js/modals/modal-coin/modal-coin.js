import { getFavorites, loadFromLS } from '../../services/helpers';
import { createModalCoinMarkup } from './markup-modal-coin';

const backdrop = document.querySelector('.modal-backdrop-coin');
const closeBtn = document.querySelector('.modal-coin-close');
const content = document.querySelector('.modal-coin-content');
// home page or favorites page
const list =
  document.querySelector('.prices-list') ||
  document.querySelector('.favorites-list');

function openModal(id) {
  const coins = loadFromLS('coins') || [];
  const coin = coins.find(item => item.id === id);
  const inFavorites = getFavorites().includes(id);

  content.innerHTML = createModalCoinMarkup(coin, inFavorites);

  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscKeydown);
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onEscKeydown);
}

function onEscKeydown(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

list.addEventListener('click', e => {
  // star has its own handler
  if (e.target.closest('.btn-favorite')) {
    return;
  }

  const row = e.target.closest('.prices-item');

  if (row) {
    openModal(row.dataset.id);
  }
});

closeBtn.addEventListener('click', closeModal);

backdrop.addEventListener('click', e => {
  if (e.target === backdrop) {
    closeModal();
  }
});
