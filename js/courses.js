import { HttpClient } from './http.js';

const loadCourses = async () => {
  const url = 'http://localhost:3000/courses/';
  const http = new HttpClient(url);
  const courses = await http.get();
  return courses;
};

export { loadCourses };
