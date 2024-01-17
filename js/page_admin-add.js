import { initDOM } from './dom.js';
import { HttpClient } from './http.js';
import { convertFormDataToJson } from './form.js';

const form = document.querySelector('#addCourseForm');

const initPage = () => {
  initDOM();
};

const addCourse = async (e) => {
  e.preventDefault();
  const course = new FormData(form);
  const obj = convertFormDataToJson(course);
  saveCourse(obj);
  console.log(obj);
};

const saveCourse = async (course) => {
  const url = 'http://localhost:3000/courses';
  const http = new HttpClient(url);
  await http.add(course);
  // location.href = './admin.html';
};

document.addEventListener('DOMContentLoaded', initPage);
form.addEventListener('submit', addCourse);
