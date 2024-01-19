import { state, query } from '../utilities/config.js';
import { initDOM } from './domInit.js';
import {
  createBestCourseDisplay,
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
    case '/html/allakurser.html':
      listAllCourses();
      break;
  }
};

const listBestCourses = async () => {
  const courses = await new AppManager().rankCourses();
  createContentHeading('Kurser med högst omdöme!');
  highlightButton(query.currentQuery);
  courses.forEach((course) => {
    const courseRow = createBestCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listStartCourses = async () => {
  const courses = await new AppManager().rankCourses();
  createContentHeading('Kurser som startar snart!');
  highlightButton(query.currentQuery);
  courses.forEach((course) => {
    const courseRow = createBestCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listPopularCourses = async () => {
  const courses = await new AppManager().popCourses();
  createContentHeading('Mest populära kurser!');
  highlightButton(query.currentQuery);
  courses.forEach((course) => {
    const courseRow = createBestCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listAllCourses = async () => {
  const courses = await new AppManager().listCourses();
  courses.forEach((course) => {
    const courseRow = createBestCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

document.addEventListener('DOMContentLoaded', initApp);
