import Course from '../Models/Course.js';
import { HttpClient } from '../lib/https.js';
import { convertFormDataToJson } from '../lib/form.js';
import { daysDate } from '../lib/days.js';

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

  async startCourses() {
    let courses = await this.listCourses();
    courses.forEach((course) => {
      daysDate(course);
    });
    courses.sort((a, b) => a.daysDifference - b.daysDifference);
    const filteredCourses = courses.filter(
      (course) => course.daysDifference > 0
    );
    const limitCourses = filteredCourses.slice(0, 5);
    return limitCourses;
  }

  async courseDetails(id) {
    console.log(2);

    try {
      const http = new HttpClient();
      const result = await http.get(`courses/${id}`);

      return new Course(
        result.id,
        result.title,
        result.description,
        result.review,
        result.days,
        result.start,
        result.price,
        result.number,
        result.remote,
        result.image,
        result.teacher,
        result.students
      );
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
    this.saveCourse(obj);
  };

  saveCourse = async (course) => {
    const url = 'http://localhost:3000/courses';
    const http = new HttpClient(url);
    await http.add(course);
    location.href = './admin.html';
  };

  regUser = async (e, form) => {
    e.preventDefault();
    const student = new FormData(form);
    const obj = convertFormDataToJson(student);
    obj.username =
      `${obj.firstname}`.toLocaleLowerCase() + Math.floor(Math.random() * 100);
    localStorage.setItem('username', obj.username);
    this.saveUser(obj);
  };

  saveUser = async (student) => {
    const http = new HttpClient('http://localhost:3000/students');
    await http.add(student);
    location.href = `./minasidor.html?user=${student.username}`;
  };

  loginUser = async (e, form) => {
    e.preventDefault();
    const username = new FormData(form);
    const obj = convertFormDataToJson(username);
    localStorage.setItem('username', obj.username);
    location.href = `./minasidor.html?user=${obj.username}`;
  };

  enroll = async (e) => {
    e.preventDefault();
    const form = document.querySelector('#listCourseForm');
    const courseFormData = new FormData(form);
    const courseId = courseFormData.get('title');

    const existingCourse = await this.getCourseDataFromServer(courseId);

    if (existingCourse) {
      existingCourse.students = existingCourse.students || [];

      const username = localStorage.getItem('username');
      existingCourse.students.push(username);

      await this.updateCourseDataOnServer(existingCourse);
    } else {
      console.error(`Course with id ${courseId} not found`);
    }
    location.href = `./minasidor.html`;
  };

  async getCourseDataFromServer(courseId) {
    const url = `http://localhost:3000/courses/${courseId}`;
    const http = new HttpClient(url);

    try {
      const response = await http.get(`courses/${courseId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching course data: ${error}`);
      return null;
    }
  }

  async updateCourseDataOnServer(course) {
    const url = `http://localhost:3000/courses/${course.id}`;
    const http = new HttpClient(url);

    try {
      await http.update(course);
    } catch (error) {
      console.error(`Error updating course data: ${error}`);
    }
  }

  myCourses = async () => {
    const user = localStorage.getItem('username');
    const allCourses = await this.listCourses();
    const enrolledCourses = allCourses.filter((course) =>
      course.students.includes(user)
    );
    return enrolledCourses;
  };
}
