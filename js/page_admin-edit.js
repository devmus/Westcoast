import { initDOM } from './dom.js';
import { HttpClient } from './http.js';
import { convertFormDataToJson } from '../lib/form.js';

const deleteButton = document.querySelector('#delete');

const initPage = async () => {
  initDOM();

  courseEdit(courseid);
};

document.addEventListener('DOMContentLoaded', initPage);
form.addEventListener('submit', updateCourse);
deleteButton.addEventListener('click', deleteCourse);
