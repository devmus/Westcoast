import { navList } from './navlist.js';

const hamburger = document.querySelector('.hamburger');
const navMenu2 = document.querySelector('.nav-menu');

const navMenu = () => {
  const menu = document.querySelector('.nav-menu');

  navList.forEach(({ text, href }) => {
    const createListitem = document.createElement('li');
    menu.appendChild(createListitem);
    const createLink = document.createElement('a');
    createListitem.appendChild(createLink);
    createLink.textContent = text;
    createLink.setAttribute('href', href);
  });
};

const createFooterContent = () => {
  const footerContainer = document.querySelector('.footer-container');
  const footerDiv = document.createElement('div');
  footerContainer.appendChild(footerDiv);
  footerDiv.innerHTML =
    '<adress>Westcoast Wajgen 23<br>415 19<br>Götalaborg</adress><br><span>\u00A9 2023 Westcoast Education</span>';
  footerDiv.classList.add('copy-footer');
};

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu2.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu2.classList.remove('active');
  })
);

const initDOM = () => {
  createFooterContent();
  navMenu();
};

export { initDOM };

console.log('domInit imported');
