import { HttpClient } from './http.js';

// const rankCourses = (courses) => {
//   courses.forEach((index) => {
//     function(index.review_score);
//   });
// };

const loadCourses = async () => {
  const url = 'http://localhost:3000/courses/';
  const http = new HttpClient(url);
  const courses = await http.get();
  return courses;
};

const initPage = async () => {
  const courses = await loadCourses();
  // rankCourses(courses);
  console.log(courses);
};

document.addEventListener('DOMContentLoaded', initPage);

// export { loadCourses };
