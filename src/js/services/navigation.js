const links = document.querySelectorAll('.header-navigation-link');

// current page from url, for / its index.html
let currentPage = location.pathname.split('/').pop();

if (currentPage === '') {
  currentPage = 'index.html';
}

links.forEach(link => {
  const page = link.getAttribute('href').replace('./', '');

  if (page === currentPage) {
    link.classList.add('current');
  }
});
