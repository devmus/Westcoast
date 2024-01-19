import { state, query } from '../utilities/config.js';
import { initDOM } from './domInit.js';
import {
  createCourseDisplay,
  createContentHeading,
  highlightButton,
} from '../lib/domManager.js';
import AppManager from '../App/AppManager.js';

const initApp = async () => {
  initDOM();

  switch (state.currentPage) {
    case '/':
    case '/index.html':
      break;
    case '/html/aktuella.html':
      if (query.currentQuery === 'omtycktakurser') {
        listBestCourses();
      } else if (query.currentQuery === 'kursstart') {
        listStartCourses();
      } else {
        listPopularCourses();
      }
      break;
    case 'html/anmalan.html':
      listAllCourses();
      break;
  }
};

const listBestCourses = async () => {
  const kurser = await new AppManager().rankCourses();
  createContentHeading('Kurser med högst omdöme!');
  highlightButton(query.currentQuery);
  kurser.forEach((course) => {
    const courseRow = createCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listStartCourses = async () => {
  const kurser = await new AppManager().rankCourses();
  createContentHeading('Kurser som startar snart!');
  highlightButton(query.currentQuery);
  kurser.forEach((course) => {
    const courseRow = createCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listPopularCourses = async () => {
  const kurser = await new AppManager().rankCourses();
  createContentHeading('Mest populära kurser!');
  highlightButton(query.currentQuery);
  kurser.forEach((course) => {
    const courseRow = createCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listAllCourses = async () => {};

document.addEventListener('DOMContentLoaded', initApp);
