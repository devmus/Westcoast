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
    case '/html/allakurser.html':
      listAllCourses();
      break;
    case '/html/admin.html':
      listAllCoursesAdmin();
      break;
    case '/html/admin-edit.html':
      const courseid = location.search.split('=')[1];
      courseEdit(courseid);
      break;
  }
};

const listBestCourses = async () => {
  const courses = await new AppManager().rankCourses();
  createContentHeading('Kurser med högst omdöme!');
  highlightButton(query.currentQuery);
  courses.forEach((course) => {
    const courseRow = createCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listStartCourses = async () => {
  const courses = await new AppManager().rankCourses();
  createContentHeading('Kurser som startar snart!');
  highlightButton(query.currentQuery);
  courses.forEach((course) => {
    const courseRow = createCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listPopularCourses = async () => {
  const courses = await new AppManager().popCourses();
  createContentHeading('Mest populära kurser!');
  highlightButton(query.currentQuery);
  courses.forEach((course) => {
    const courseRow = createCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listAllCourses = async () => {
  const courses = await new AppManager().listCourses();
  courses.forEach((course) => {
    const courseRow = createCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
};

const listAllCoursesAdmin = async () => {
  const courses = await new AppManager().listCourses();
  courses.forEach((course) => {
    const courseRow = createCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });

  const img = document.querySelectorAll('.course-div img');
  img.forEach((img) => {
    img.style.display = 'none';
  });
};

const courseEdit = async (id) => {
  const course = await new AppManager().editCourse(id);
  const form = document.querySelector('#updateCourseForm');
  console.log(course);

  const entries = new URLSearchParams(course).entries();

  for (let [key, value] of entries) {
    switch (key) {
      case 'id':
      case 'review':
      case 'students':
      case 'number':
        break;
      case 'distans':
      default:
        const input = form.elements[key];
        input.value = value;
    }
  }
};

document.addEventListener('DOMContentLoaded', initApp);
