import { state } from '../utilities/config.js';
import { initDOM } from './domInit.js';
import { rankCourses } from '../js/rank.js';
import { createCourseDisplay } from '../lib/domManager.js';
import AppManager from '../App/AppManager.js';

const initApp = async () => {
  initDOM();

  switch (state.currentPage) {
    case '/':
    case '/index.html':
      break;
    case '/html/toppkurser.html':
      listBestCourses();
      break;
  }
};

const listBestCourses = async () => {
  const kurser = await new AppManager().rankCourses();

  console.log(kurser);

  kurser.forEach((kurs) => {
    const card = createCourseDisplay(kurs);
  });
};

document.addEventListener('DOMContentLoaded', initApp);
