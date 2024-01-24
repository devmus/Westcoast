import { state, query } from '../utilities/config.js';
import { initDOM } from './domInit.js';
import {
  createCourseDisplay,
  createSortedDisplay,
  createCourseDetails,
  dropdown,
} from '../lib/domManager.js';
import AppManager from '../App/AppManager.js';
import { rankCourses, popCourses, startCourses } from '../lib/sorting.js';

const initApp = async () => {
  initDOM();

  //Skapa funktion som kallar switch, importerad från utilities/state
  switch (state.currentPage) {
    case '/':
    case '/index.html':
      break;
    case '/html/allcourses.html':
      allcourses();
      break;
    case '/html/coursedetails.html':
      courseDetails();
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
    case '/html/admin.html':
      allcourses();
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
    case '/html/enroll.html':
      if (!localStorage.getItem('username')) {
        alert('Du måste logga in först!');
      } else {
        enrollCourse();
      }
      break;
  }
};

const allcourses = async () => {
  const courses = await new AppManager().getAllCourses();
  createCourseDisplay(courses);
};

const courseDetails = async () => {
  const id = location.search.split('=')[1];
  const course = await new AppManager().courseDetails(id);
  createCourseDetails(course);
};

const listPopularCourses = async () => {
  const heading = 'Mest populära kurser!';
  const courses = await new AppManager().getAllCourses();
  const sortedCourses = popCourses(courses);
  createSortedDisplay(sortedCourses, heading);
};

const listBestCourses = async () => {
  const heading = 'Kurser med högst omdöme!';
  const courses = await new AppManager().getAllCourses();
  const sortedCourses = rankCourses(courses);
  createSortedDisplay(sortedCourses, heading);
};

const listStartCourses = async () => {
  const heading = 'Kurser som startar snart!';
  const courses = await new AppManager().getAllCourses();
  const sortedCourses = startCourses(courses);
  createSortedDisplay(sortedCourses, heading);
};

/////

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

/////

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
  const students = await new AppManager().listStudents();
  const filterStudents = await new AppManager().filterStudents(students);
  const student = filterStudents[0];

  document.querySelector(
    '#fullname'
  ).textContent = `${student.firstname} ${student.lastname}`;
  document.querySelector('#address').textContent = student.adress;
  document.querySelector('#email').textContent = student.email;
  document.querySelector('#mobil').textContent = student.phone;

  const form = document.querySelector('#listCourseForm');
  const courses = await new AppManager().listCourses();

  dropdown(courses);
  form.addEventListener('submit', (e) => new AppManager().enroll(e, form));
};

document.addEventListener('DOMContentLoaded', initApp);
