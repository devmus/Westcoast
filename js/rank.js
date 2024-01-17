import { loadCourses } from './courses.js';

const rankCourses = async () => {
  const courses = await loadCourses();

  courses.sort(
    (a, b) => parseFloat(b.review_score) - parseFloat(a.review_score)
  );
  let bestCourses = courses.slice(0, 5);

  bestCourses.forEach((obj, index) => {
    obj.id = index + 1;
  });

  return bestCourses;
};

export { rankCourses };

console.log('rank imported');
