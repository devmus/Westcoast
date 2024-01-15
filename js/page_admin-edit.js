import { initDOM } from './dom.js';
import { HttpClient } from './http.js';
import { convertFormDataToJson } from './form.js';

const form = document.querySelector('#updateCourseForm');
const deleteButton = document.querySelector('#delete');
let courseId = 0;

const initPage = async () => {
  initDOM();
  const courseid = location.search.split('=')[1];
  courseEdit(courseid);
};

const courseEdit = async (id) => {
  courseId = id;
  const url = `http://localhost:3000/courses/${id}`;
  const http = new HttpClient(url);
  const course = await http.get();
  loadCourseToForm(course);
};

const loadCourseToForm = (course) => {
  const entries = new URLSearchParams(course).entries();

  for (let [key, value] of entries) {
    if (key !== 'id') {
      const input = form.elements[key];
      input.value = value;
    }
  }
};

const updateCourse = async (e) => {
  e.preventDefault();
  const course = new FormData(form);
  const obj = convertFormDataToJson(course);
  const url = `http://localhost:3000/courses/${courseId}`;
  const http = new HttpClient(url);
  await http.update(obj);
  location.href = './admin.html';
};

const deleteCourse = async () => {
  const url = `http://localhost:3000/courses/${courseId}`;
  const http = new HttpClient(url);
  await http.delete();
  location.href = './admin.html';
};

document.addEventListener('DOMContentLoaded', initPage);
form.addEventListener('submit', updateCourse);
deleteButton.addEventListener('click', deleteCourse);
