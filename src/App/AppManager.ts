import { HttpClient } from '../lib/https.js';
import { convertFormDataToJson } from '../lib/form.js';
import { Courses } from '../models/CourseModel.js';
import { Students } from '../models/StudentModel.js';
import { query } from '../utilities/config.js';

export default class AppManager {

  async getAllCourses(): Promise<[Courses]> {
    try {
      return await new HttpClient().get(`courses/`) as [Courses];
    } catch (error) {
      throw error;
    }
  }

  async courseDetails(id: string): Promise<Courses> {
    try {
      return await new HttpClient().get(`courses/${id}`) as Courses;
    } catch (error) {
      throw error;
    }
  }

  updateCourse = async (e: Event): Promise<void> => {
    e.preventDefault() as void;
    const form: HTMLFormElement = document.querySelector<HTMLFormElement>('#updateCourseForm')!;
    const course: FormData = new FormData(form);
    const obj = convertFormDataToJson(course);
    
    obj.students = obj.students.split(',');
    obj.price = parseInt(obj.price);
    obj.review = parseInt(obj.review);
    
    const url: string = `http://localhost:3000/courses/${query.currentQuery}`;
    const http = new HttpClient(url);

    await http.update(obj as Courses) as Courses;
    location.href = './admin.html';
  };

  deleteCourse = async (): Promise<void> => {
    const url: string = `http://localhost:3000/courses/${query.currentQuery}`;
    const http = new HttpClient(url);

    await http.delete() as void;
    location.href = './admin.html';
  };

  addCourse = async (e: Event, form: HTMLFormElement): Promise<void> => {
    e.preventDefault() as void;
    const course: FormData = new FormData(form);
    const obj = convertFormDataToJson(course);
    obj.review = 0;
    obj.students = [];
    this.saveCourse(obj as Courses);
  };

  saveCourse = async (course: Courses): Promise<void> => {
    const url: string = 'http://localhost:3000/courses';
    const http: HttpClient = new HttpClient(url);
    await http.add(course as Courses);
    // location.href = './admin.html';
  };

  regUser = async (e: Event, form: HTMLFormElement): Promise<void> => {
    e.preventDefault() as void;
    const student: FormData = new FormData(form);
    const obj = convertFormDataToJson(student);
    obj.username =
      `${obj.firstname}`.toLocaleLowerCase() + Math.floor(Math.random() * 100);
    localStorage.setItem('username', obj.username);
    this.saveUser(obj as Students);
  };

  saveUser = async (student: Students): Promise<void> => {
    const http: HttpClient = new HttpClient('http://localhost:3000/students');
    await http.add(student as Students);
    location.href = `./minasidor.html?user=${student.username}`;
  };

  loginUser = async (e: Event, form: HTMLFormElement): Promise<void> => {
    e.preventDefault() as void;
    const username: FormData = new FormData(form);
    const obj = convertFormDataToJson(username);
    localStorage.setItem('username', obj.username);
    location.href = `./minasidor.html?user=${obj.username}`;
  };

  myCourses = async (): Promise<Courses[]> => {
    const user = localStorage.getItem('username');
    const allCourses: [Courses] = await this.getAllCourses();
    const enrolledCourses = allCourses.filter((course: Courses) =>
      course.students.includes(user as string) as boolean
    );
    
    return enrolledCourses;
  };

  async listStudents(): Promise<[Students]> {
    try {
      return await new HttpClient().get('students') as [Students];
    } catch (error) {
      throw error;
    }
  }

  async filterStudents(students: [Students]): Promise<Students[]> {
    const filter = students.filter(
      (student) => student.username === localStorage.getItem('username')
    );
    return filter;
  }

  enroll = async (e: Event, form: HTMLFormElement) => {
    e.preventDefault();
    const courseFormData = new FormData(form);
    const courseId = courseFormData.get('title') as string;

    const existingCourse = await this.courseDetails(courseId as string);

    const username = localStorage.getItem('username') as string;
    existingCourse.students.push(username);

    await this.updateEnrolledStudent(existingCourse);

    location.href = `./minasidor.html`;
  };

  async updateEnrolledStudent(course: Courses) {
    const http = new HttpClient(`http://localhost:3000/courses/${course.id}`);
    try {
      await http.update(course);
    } catch (error) {
      throw error;
    }
  }
}
