import { state, query } from '../utilities/config.js';
import { initDOM } from './domInit.js';
import {
  createCourseDisplay,
  createContentHeading,
  highlightButton,
  createCourseDetails,
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
    case '/html/coursedetails.html':
      const courseDetailsId = location.search.split('=')[1];
      courseDetails(courseDetailsId);
      break;
    case '/html/admin.html':
      listAllCoursesAdmin();
      break;
    case '/html/admin-edit.html':
      const courseAdminId = location.search.split('=')[1];
      courseEdit(courseAdminId);
      break;
    case '/html/admin-add.html':
      courseAdd();
      break;
    case '/html/minasidor.html':
      loggaIn();
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

const courseDetails = async (id) => {
  const course = await new AppManager().courseDetails(id);
  createCourseDetails(course);
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
  const course = await new AppManager().courseDetails(id);
  const form = document.querySelector('#updateCourseForm');
  const deleteButton = document.querySelector('#delete');

  const extraInfo = new AppManager().extrainfo(course);

  const student_names = extraInfo.students.toString();

  document.querySelector('#number').textContent = extraInfo.number;
  document.querySelector('#student_names').textContent = student_names;
  document.querySelector('#student_count').textContent =
    extraInfo.students.length;
  document.querySelector('#review').textContent = extraInfo.review;

  const entries = new URLSearchParams(course).entries();

  for (let [key, value] of entries) {
    switch (key) {
      case 'students':
      case 'id':
      case 'review':
      case 'number':
      case 'distans':
      default:
        const input = form.elements[key];
        input.value = value;
    }
  }

  form.addEventListener('submit', new AppManager().updateCourse);
  deleteButton.addEventListener('click', new AppManager().deleteCourse);
};

const courseAdd = async () => {
  const form = document.querySelector('#addCourseForm');
  form.addEventListener('submit', (e) => new AppManager().addCourse(e, form));
};

const loggaIn = async () => {};

document.addEventListener('DOMContentLoaded', initApp);
