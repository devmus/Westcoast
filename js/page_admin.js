import { initDOM, createCard } from './dom.js';
import { loadCourses } from './courses.js';

const initPage = async () => {
  initDOM();
  const adminCourses = await loadCourses();
  console.log(adminCourses);

  adminCourses.forEach((index) => {
    createCard(
      index.id,
      index.course_name,
      index.description,
      index.courselength,
      index.teacher,
      index.review_score
    );
  });
};

document.addEventListener('DOMContentLoaded', initPage);
