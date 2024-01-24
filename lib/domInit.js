import { navList } from './navlist.js';

const hamburger = document.querySelector('.hamburger');
const navMenu2 = document.querySelector('.nav-menu');

const navMenu = () => {
  const menu = document.querySelector('.nav-menu');

  navList.forEach(({ text, href, type }) => {
    const createLink = document.createElement('a');
    createLink.setAttribute('href', href);

    const createListitem = document.createElement('li');
    createListitem.classList.add(type);
    createListitem.textContent = text;

    createLink.appendChild(createListitem);
    menu.appendChild(createLink);
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

const user = () => {
  if (!localStorage.getItem('username')) {
    document.querySelector('.user').style.display = 'none';
  } else {
    document.querySelector('.user').style.display = 'block';
    document.querySelector('.user').textContent = `Hej ${localStorage.getItem(
      'username'
    )}!`;
  }
};

const initDOM = () => {
  createFooterContent();
  navMenu();
  user();
};

export { initDOM };
