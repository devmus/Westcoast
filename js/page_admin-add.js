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
};

const saveCourse = async (course) => {
  const url = 'http://localhost:3000/course';
  const http = new HttpClient(url);
  await http.add(course);
};

document.addEventListener('DOMContentLoaded', initPage);
form.addEventListener('submit', addCourse);
