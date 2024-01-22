import { state, query } from '../utilities/config.js';
import { initDOM } from './domInit.js';
import {
  createCourseDisplay,
  createContentHeading,
  highlightButton,
  createCourseDetails,
  dropdown,
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
      if (query.currentQuery === 'logOldUser') {
        login();
      } else if (query.currentQuery === 'regNewUser') {
        register();
      } else {
        myCourses();
      }
      break;
    case '/html/anmalan.html':
      if (!localStorage.getItem('username')) {
        alert('Du måste logga in först!');
      } else {
        enrollCourse();
      }
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
  const courses = await new AppManager().startCourses();
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

  console.log(course);
  console.log(...entries);

  for (let [key, value] of entries) {
    switch (key) {
      case 'students':
      case 'id':
      case 'review':
      case 'number':
      case 'remote':
        break;
      default:
        const input = form.elements[key];
        input.value = value;
        break;
    }
  }

  form.addEventListener('submit', new AppManager().updateCourse);
  deleteButton.addEventListener('click', new AppManager().deleteCourse);
};

const courseAdd = async () => {
  const form = document.querySelector('#addCourseForm');
  form.addEventListener('submit', (e) => new AppManager().addCourse(e, form));
};

const login = async () => {
  highlightButton(query.currentQuery);
  document.querySelector('.login-container').style.display = 'block';
  document.querySelector('.user').style.display = 'none';
  localStorage.clear();
  document.querySelector('.logged-in').style.display = 'none';

  const form = document.querySelector('#loginForm');
  form.addEventListener('submit', (e) => new AppManager().loginUser(e, form));
};

const register = async () => {
  highlightButton(query.currentQuery);
  document.querySelector('.reg-container').style.display = 'block';
  document.querySelector('.logged-in').style.display = 'none';

  const form = document.querySelector('#regForm');
  form.addEventListener('submit', (e) => new AppManager().regUser(e, form));
};

const myCourses = async () => {
  if (!localStorage.getItem('username')) {
    document.querySelector('.logged-in').style.display = 'none';
  } else {
    document.querySelector('.not-logged').style.display = 'none';
    document.querySelector(
      '#logout'
    ).textContent = `Logga ut ${localStorage.getItem('username')}`;
  }
  const getMyCourses = await new AppManager().myCourses();

  getMyCourses.forEach((course) => {
    const courseRow = createCourseDisplay(course);
    document.querySelector('.cards-container').appendChild(courseRow);
  });
  //Hämta hem alla kurser
  //Läs av vilka som har en student med samma namn som username i localstorage
  //skapa DOM rad för varje kurs som studenten är reggad till
};

const enrollCourse = async () => {
  const form = document.querySelector('#listCourseForm');
  const courses = await new AppManager().listCourses();
  dropdown(courses);
  form.addEventListener('submit', (e) => new AppManager().enroll(e, form));
};

document.addEventListener('DOMContentLoaded', initApp);
