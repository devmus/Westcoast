import { navList } from '../lib/navlist.js';
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-menu');
const userDisplay = document.querySelector('.user');
const navMenu = () => {
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
    footerDiv.innerHTML = `
  <adress>Westcoasten<br>
  415 19<br>
  Götalaborg</adress>
  <span>\u00A9 2023 Westcoast Education</span>`;
    footerDiv.classList.add('copy-footer');
};
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach((n) => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    menu.classList.remove('active');
}));
const user = () => {
    if (!localStorage.getItem('username')) {
        userDisplay.style.display = 'none';
    }
    else {
        userDisplay.style.display = 'block';
        userDisplay.textContent = `Hej ${localStorage.getItem('username')}!`;
    }
};
const initDOM = () => {
    createFooterContent();
    navMenu();
    user();
};
export { initDOM };
