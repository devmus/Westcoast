import { HttpClient } from '../lib/https.js';
import { convertFormDataToJson } from '../lib/form.js';
import { query } from '../utilities/config.js';
export default class AppManager {
    constructor() {
        this.updateCourse = async (e) => {
            e.preventDefault();
            const form = document.querySelector('#updateCourseForm');
            const course = new FormData(form);
            const obj = convertFormDataToJson(course);
            obj.students = obj.students.split(',');
            obj.price = parseInt(obj.price);
            obj.review = parseInt(obj.review);
            const url = `http://localhost:3000/courses/${query.currentQuery}`;
            const http = new HttpClient(url);
            await http.update(obj);
            location.href = './admin.html';
        };
        this.deleteCourse = async () => {
            const url = `http://localhost:3000/courses/${query.currentQuery}`;
            const http = new HttpClient(url);
            await http.delete();
            location.href = './admin.html';
        };
        this.addCourse = async (e, form) => {
            e.preventDefault();
            const course = new FormData(form);
            const obj = convertFormDataToJson(course);
            obj.review = 0;
            obj.students = [];
            this.saveCourse(obj);
        };
        this.saveCourse = async (course) => {
            const url = 'http://localhost:3000/courses';
            const http = new HttpClient(url);
            await http.add(course);
            // location.href = './admin.html';
        };
        this.regUser = async (e, form) => {
            e.preventDefault();
            const student = new FormData(form);
            const obj = convertFormDataToJson(student);
            obj.username =
                `${obj.firstname}`.toLocaleLowerCase() + Math.floor(Math.random() * 100);
            localStorage.setItem('username', obj.username);
            this.saveUser(obj);
        };
        this.saveUser = async (student) => {
            const http = new HttpClient('http://localhost:3000/students');
            await http.add(student);
            location.href = `./minasidor.html?user=${student.username}`;
        };
        this.loginUser = async (e, form) => {
            e.preventDefault();
            const username = new FormData(form);
            const obj = convertFormDataToJson(username);
            localStorage.setItem('username', obj.username);
            location.href = `./minasidor.html?user=${obj.username}`;
        };
        this.myCourses = async () => {
            const user = localStorage.getItem('username');
            const allCourses = await this.getAllCourses();
            const enrolledCourses = allCourses.filter((course) => course.students.includes(user));
            return enrolledCourses;
        };
        this.enroll = async (e, form) => {
            e.preventDefault();
            const courseFormData = new FormData(form);
            const courseId = courseFormData.get('title');
            const existingCourse = await this.courseDetails(courseId);
            const username = localStorage.getItem('username');
            existingCourse.students.push(username);
            await this.updateEnrolledStudent(existingCourse);
            location.href = `./minasidor.html`;
        };
    }
    async getAllCourses() {
        try {
            return await new HttpClient().get(`courses/`);
        }
        catch (error) {
            throw error;
        }
    }
    async courseDetails(id) {
        try {
            return await new HttpClient().get(`courses/${id}`);
        }
        catch (error) {
            throw error;
        }
    }
    async listStudents() {
        try {
            return await new HttpClient().get('students');
        }
        catch (error) {
            throw error;
        }
    }
    async filterStudents(students) {
        const filter = students.filter((student) => student.username === localStorage.getItem('username'));
        return filter;
    }
    async updateEnrolledStudent(course) {
        const http = new HttpClient(`http://localhost:3000/courses/${course.id}`);
        try {
            await http.update(course);
        }
        catch (error) {
            throw error;
        }
    }
}
