import { state, query } from '../utilities/config.js';
import { initDOM } from '../dom/domInit.js';
import { createCourseDisplay, createSortedDisplay, createCourseDetails, extraInfo, dropdown, userBtns, loggedIn, studentInfo, } from '../dom/domManager.js';
import AppManager from '../App/AppManager.js';
import { rankCourses, popCourses, startCourses } from './sorting.js';
const initApp = async () => {
    initDOM();
    switch (state.currentPage) {
        case '/':
        case 'src/index.html':
            break;
        case '/src/html/allcourses.html':
        case '/src/html/admin.html':
            allcourses();
            break;
        case '/src/html/coursedetails.html':
            courseDetails();
            break;
        case '/src/html/aktuella.html':
            if (query.currentQuery === 'omtycktakurser') {
                listBestCourses();
            }
            else if (query.currentQuery === 'kursstart') {
                listStartCourses();
            }
            else {
                listPopularCourses();
            }
            break;
        case '/src/html/admin-edit.html':
            courseEdit();
            break;
        case '/src/html/admin-add.html':
            courseAdd();
            break;
        case '/src/html/minasidor.html':
            if (query.currentQuery === 'logOldUser') {
                login();
            }
            else if (query.currentQuery === 'regNewUser') {
                register();
            }
            else {
                myCourses();
            }
            break;
        case '/src/html/enroll.html':
            if (!localStorage.getItem('username')) {
                alert('Du måste logga in först!');
            }
            else {
                enrollCourse();
            }
            break;
    }
};
const allcourses = async () => {
    const courses = await new AppManager().getAllCourses();
    createCourseDisplay(courses);
};
const courseDetails = async () => {
    const id = parseInt(location.search.split('=')[1]);
    const course = await new AppManager().courseDetails(id);
    createCourseDetails(course);
};
const listPopularCourses = async () => {
    const heading = 'Mest populära kurser!';
    const courses = await new AppManager().getAllCourses();
    const sortedCourses = popCourses(courses);
    createSortedDisplay(sortedCourses, heading);
};
const listBestCourses = async () => {
    const heading = 'Kurser med högst omdöme!';
    const courses = await new AppManager().getAllCourses();
    const sortedCourses = rankCourses(courses);
    createSortedDisplay(sortedCourses, heading);
};
const listStartCourses = async () => {
    const heading = 'Kurser som startar snart!';
    const courses = await new AppManager().getAllCourses();
    const sortedCourses = startCourses(courses);
    createSortedDisplay(sortedCourses, heading);
};
const courseEdit = async () => {
    const id = parseInt(location.search.split('=')[1]);
    const deleteButton = document.querySelector('#delete');
    const form = document.querySelector('#updateCourseForm');
    const course = await new AppManager().courseDetails(id);
    Object.entries(course).forEach(([key, value]) => {
        const input = form.elements.namedItem(key);
        if (input) {
            input.value = value.toString();
        }
    });
    extraInfo(course);
    form.addEventListener('submit', new AppManager().updateCourse);
    deleteButton.addEventListener('click', new AppManager().deleteCourse);
};
const courseAdd = async () => {
    const form = document.querySelector('#addCourseForm');
    form.addEventListener('submit', (e) => new AppManager().addCourse(e, form));
};
const login = async () => {
    localStorage.clear();
    userBtns();
    const form = document.querySelector('#loginForm');
    form.addEventListener('submit', (e) => new AppManager().loginUser(e, form));
};
const register = async () => {
    userBtns();
    const form = document.querySelector('#regForm');
    form.addEventListener('submit', (e) => new AppManager().regUser(e, form));
};
const myCourses = async () => {
    loggedIn();
    const myCourses = await new AppManager().myCourses();
    createCourseDisplay(myCourses);
};
const enrollCourse = async () => {
    const form = document.querySelector('#listCourseForm');
    const students = await new AppManager().listStudents();
    const filterStudents = await new AppManager().filterStudents(students);
    const student = filterStudents[0];
    studentInfo(student);
    const courses = await new AppManager().getAllCourses();
    dropdown(courses);
    form.addEventListener('submit', (e) => new AppManager().enroll(e, form));
};
document.addEventListener('DOMContentLoaded', initApp);
