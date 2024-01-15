import { initDOM, createCard } from './dom.js';
import { rankCourses } from './rank.js';

const initPage = async () => {
  initDOM();
  const bestCourses = await rankCourses();

  bestCourses.forEach((index) => {
    createCard(
      index.id,
      index.course_name,
      index.description,
      index.length,
      index.teacher,
      index.review_score
    );
  });
};

document.addEventListener('DOMContentLoaded', initPage);
