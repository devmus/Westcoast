import Course from '../Models/Course.js';
import { HttpClient } from '../lib/https.js';
import { convertFormDataToJson } from '../lib/form.js';

export default class AppManager {
  async listCourses() {
    try {
      const http = new HttpClient();
      const result = await http.get('courses');
      // console.log(result);

      const course = result.map((course) => {
        return new Course(
          course.id,
          course.title,
          course.description,
          course.review,
          course.days,
          course.start,
          course.price,
          course.number,
          course.remote,
          course.image,
          course.teacher,
          course.students
        );
      });

      return course;
    } catch (error) {
      throw error;
    }
  }

  async rankCourses() {
    const courses = await this.listCourses();
    courses.sort((a, b) => parseFloat(b.review) - parseFloat(a.review));
    let limitCourses = courses.slice(0, 5);
    return limitCourses;
  }

  async popCourses() {
    const courses = await this.listCourses();
    courses.sort(
      (a, b) => parseFloat(b.students.length) - parseFloat(a.students.length)
    );
    let limitCourses = courses.slice(0, 5);
    return limitCourses;
  }

  async courseDetails(id) {
    try {
      const http = new HttpClient();
      const result = await http.get(`courses/${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  }

  extrainfo(course) {
    return new Course(
      course.id,
      course.title,
      course.description,
      course.review,
      course.days,
      course.start,
      course.price,
      course.number,
      course.remote,
      course.image,
      course.teacher,
      course.students
    );
  }

  updateCourse = async (e) => {
    e.preventDefault();
    let courseId = 0;
    courseId = location.search.split('=')[1];
    const form = document.querySelector('#updateCourseForm');
    const course = new FormData(form);
    const obj = convertFormDataToJson(course);
    const url = `http://localhost:3000/courses/${courseId}`;
    const http = new HttpClient(url);
    obj.students = obj.students.split(',');
    obj.price = parseInt(obj.price);
    obj.review = parseInt(obj.review);

    await http.update(obj);
    location.href = './admin.html';
  };

  deleteCourse = async () => {
    let courseId = 0;
    courseId = location.search.split('=')[1];
    const url = `http://localhost:3000/courses/${courseId}`;
    const http = new HttpClient(url);
    await http.delete();
    location.href = './admin.html';
  };

  addCourse = async (e, form) => {
    e.preventDefault();
    const course = new FormData(form);
    const obj = convertFormDataToJson(course);
    obj.review = 0;
    obj.students = '';
    obj.number = '';
    this.saveCourse(obj);
  };

  saveCourse = async (course) => {
    const url = 'http://localhost:3000/courses';
    const http = new HttpClient(url);
    await http.add(course);
    // location.href = './admin.html';
  };
}
