import { navList } from './navlist.js';

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

const hamburger = document.querySelector('.hamburger');
const navMenu2 = document.querySelector('.nav-menu');

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

const createCard = (
  id,
  course_name,
  description,
  courselength,
  teacher,
  review_score
) => {
  const title = document.title;
  const cardsContainer = document.querySelector('.cards-container');
  const createSection = document.createElement('section');
  cardsContainer.appendChild(createSection);
  const createLink = document.createElement('a');
  createSection.appendChild(createLink);
  const createDiv = document.createElement('div');
  createLink.appendChild(createDiv);
  const cardContent = document.createElement('span');
  createDiv.appendChild(cardContent);
  if (title === 'Westcoast Education - Home') {
    createSection.classList.add('course-card', 'card-best');
    cardContent.innerText = `Kurs: ${course_name}\n Lärare: ${teacher}\n Omdöme: ${review_score}`;
  } else if (title === 'Westcoast Education - Alla kurser') {
    createSection.classList.add('course-card', 'card-all');
    cardContent.innerText = `Kurs: ${course_name}\n Lärare: ${teacher}\n Längd: ${courselength}`;
  } else if (title === 'Westcoast Education - Administration') {
    createSection.classList.add('course-card', 'card-admin');
    cardContent.innerText = `id: ${id}\n Kurs: ${course_name} - ${description}\n Lärare: ${teacher}\n Längd: ${courselength}`;
    createDiv.setAttribute('kursid', `${id}`);
    createLink.setAttribute('href', `../html/admin-edit.html?id=${id}`);
  }
};

export { initDOM, createCard };
