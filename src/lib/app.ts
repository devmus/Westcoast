import { state, query } from '../utilities/config.js';
import { initDOM } from '../dom/domInit.js';
import {
  createCourseDisplay,
  createSortedDisplay,
  createCourseDetails,
  extraInfo,
  dropdown,
  userBtns,
  loggedIn,
  studentInfo,
} from '../dom/domManager.js';
import AppManager from '../App/AppManager.js';
import { rankCourses, popCourses, startCourses } from './sorting.js';
import { Courses } from '../models/CourseModel.js';
import { Students } from '../models/StudentModel.js';


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
      } else if (query.currentQuery === 'kursstart') {
        listStartCourses();
      } else {
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
      } else if (query.currentQuery === 'regNewUser') {
        register();
      } else {
        myCourses();
      }
      break;
    case '/src/html/enroll.html':
      if (!localStorage.getItem('username')) {
        alert('Du måste logga in först!');
      } else {
        enrollCourse();
      }
      break;
  }
};

const allcourses = async (): Promise<void> => {
  const courses: [Courses] = await new AppManager().getAllCourses();
  createCourseDisplay(courses as [Courses]) as void;
};

const courseDetails = async (): Promise<void> => {
  const id: number = parseInt(location.search.split('=')[1]);
  const course: Courses = await new AppManager().courseDetails(id);
  createCourseDetails(course as Courses) as void;
};

const listPopularCourses = async (): Promise<void> => {
  const heading: string = 'Mest populära kurser!';
  const courses: [Courses] = await new AppManager().getAllCourses();
  const sortedCourses: [Courses] = popCourses(courses);
  createSortedDisplay(sortedCourses as [Courses], heading as string) as void;
};

const listBestCourses = async (): Promise<void> => {
  const heading: string = 'Kurser med högst omdöme!';
  const courses: [Courses] = await new AppManager().getAllCourses();
  const sortedCourses: [Courses] = rankCourses(courses);
  createSortedDisplay(sortedCourses as [Courses], heading as string) as void;
};

const listStartCourses = async (): Promise<void> => {
  const heading: string = 'Kurser som startar snart!';
  const courses: [Courses] = await new AppManager().getAllCourses();
  const sortedCourses: [Courses] = startCourses(courses);
  createSortedDisplay(sortedCourses as [Courses], heading as string) as void;
};

const courseEdit = async (): Promise<void> => {
  const id: number = parseInt(location.search.split('=')[1]);
  const deleteButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#delete')!;
  const form: HTMLFormElement = document.querySelector<HTMLFormElement>('#updateCourseForm')!;
  const course: Courses = await new AppManager().courseDetails(id);
  Object.entries(course as Courses).forEach(([key, value]) => {
    const input = form.elements.namedItem(key) as HTMLInputElement | null;
    if (input) {
      input.value = value.toString();
    }
  });
  extraInfo(course) as void;
  form.addEventListener('submit', new AppManager().updateCourse);
  deleteButton.addEventListener('click', new AppManager().deleteCourse) as void;
};

const courseAdd = async (): Promise<void> => {
  const form = document.querySelector<HTMLFormElement>('#addCourseForm')!;
  form.addEventListener('submit', (e) => new AppManager().addCourse(e, form)) as void;
};

const login = async (): Promise<void> => {
  localStorage.clear() as void;
  userBtns() as void;
  const form: HTMLFormElement = document.querySelector<HTMLFormElement>('#loginForm')!;
  form.addEventListener('submit', (e) => new AppManager().loginUser(e, form)) as void;
};

const register = async (): Promise<void> => {
  userBtns() as void;
  const form: HTMLFormElement = document.querySelector<HTMLFormElement>('#regForm')!;
  form.addEventListener('submit', (e) => new AppManager().regUser(e, form)) as void;
};

const myCourses = async (): Promise<void> => {
  loggedIn() as void;
  const myCourses: Courses[] = await new AppManager().myCourses();
  createCourseDisplay(myCourses) as void;
};

const enrollCourse = async (): Promise<void> => {
  const form: HTMLFormElement = document.querySelector<HTMLFormElement>('#listCourseForm')!;
  const students: [Students] = await new AppManager().listStudents();
  const filterStudents: Students[] = await new AppManager().filterStudents(students);
  const student: Students = filterStudents[0];
  studentInfo(student) as void;
  const courses: [Courses] = await new AppManager().getAllCourses();
  dropdown(courses) as void;
  form.addEventListener('submit', (e) => new AppManager().enroll(e, form)) as void;
};

document.addEventListener('DOMContentLoaded', initApp);
