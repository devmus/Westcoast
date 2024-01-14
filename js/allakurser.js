import { initDOM, createCard } from './dom.js';
import { loadCourses } from './courses.js';

const initPage = async () => {
  initDOM();
  const allCourses = await loadCourses();

  allCourses.forEach((index) => {
    createCard(
      index.id,
      index.name,
      index.description,
      index.length,
      index.teacher,
      index.review_score
    );
  });
};

document.addEventListener('DOMContentLoaded', initPage);
