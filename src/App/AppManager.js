import { HttpClient } from '../lib/https.js';
import { convertFormDataToJson } from '../lib/form.js';
export default class AppManager {
  async getAllCourses() {
    try {
      return await new HttpClient().get(`courses/`);
    } catch (error) {
      throw error;
    }
  }

  async courseDetails(id) {
    try {
      return await new HttpClient().get(`courses/${id}`);
    } catch (error) {
      throw error;
    }
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

  myCourses = async () => {
    const user = localStorage.getItem('username');
    const allCourses = await this.getAllCourses();
    const enrolledCourses = allCourses.filter((course) =>
      course.students.includes(user)
    );
    return enrolledCourses;
  };

  async listStudents() {
    const http = new HttpClient();
    try {
      return await http.get('students');
    } catch (error) {
      throw error;
    }
  }

  async filterStudents(students) {
    const filter = students.filter(
      (student) => student.username === localStorage.getItem('username')
    );
    return filter;
  }

  enroll = async (e) => {
    e.preventDefault();
    const form = document.querySelector('#listCourseForm');
    const courseFormData = new FormData(form);
    const courseId = courseFormData.get('title');
    console.log(courseId);

    const existingCourse = await this.courseDetails(courseId);

    const username = localStorage.getItem('username');
    existingCourse.students.push(username);

    await this.updateEnrolledStudent(existingCourse);

    location.href = `./minasidor.html`;
  };

  async updateEnrolledStudent(course) {
    const url = `http://localhost:3000/courses/${course.id}`;
    const http = new HttpClient(url);

    try {
      await http.update(course);
    } catch (error) {
      throw error;
    }
  }
}