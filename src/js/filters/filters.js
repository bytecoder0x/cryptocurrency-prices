import { debounce } from 'lodash';
import { renderPrices, loadPrices } from '../prices/prices';

// TODO: move debounce to helpers

const form = document.querySelector('.filters-form');
const refreshBtn = document.querySelector('.filters-refresh-btn');

form.addEventListener('submit', e => {
  e.preventDefault();
});

// wait 300ms after typing
form.elements.search.addEventListener('input', debounce(renderPrices, 300));
refreshBtn.addEventListener('click', loadPrices);
