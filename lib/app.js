import { state, query } from '../utilities/config.js';
import { initDOM } from './domInit.js';
import {
  createCourseDisplay,
  createContentHeading,
} from '../lib/domManager.js';
import AppManager from '../App/AppManager.js';

const initApp = async () => {
  initDOM();

  switch (state.currentPage) {
    case '/':
    case '/index.html':
      break;
    case `/html/aktuella.html`:
      if (query.currentQuery === 'omtycktakurser') {
        listPopularCourses();
      } else if (query.currentQuery === 'kursstart') {
        listStartCourses();
      } else {
        listBestCourses();
      }
      break;
  }
};

const listPopularCourses = async () => {
  const kurser = await new AppManager().rankCourses();
  createContentHeading('Mest populära kurser!');
  kurser.forEach((kurs) => {
    const kursRad = createCourseDisplay(kurs);
    document.querySelector('.cards-container').appendChild(kursRad);
  });
};

const listStartCourses = async () => {
  const kurser = await new AppManager().rankCourses();
  createContentHeading('Kurser som startar snart!');
  kurser.forEach((kurs) => {
    const kursRad = createCourseDisplay(kurs);
    document.querySelector('.cards-container').appendChild(kursRad);
  });
};

const listBestCourses = async () => {
  const kurser = await new AppManager().rankCourses();
  createContentHeading('Kurser med högst betyg!');
  kurser.forEach((kurs) => {
    const kursRad = createCourseDisplay(kurs);
    document.querySelector('.cards-container').appendChild(kursRad);
  });
};

document.addEventListener('DOMContentLoaded', initApp);
