import { Courses } from '../models/CourseModel.js';
import { Students } from '../models/StudentModel.js';
import { query } from '../utilities/config.js';
import {
  createCourseRow,
  createCourseContentContainer,
  createCourseImg,
  createCourseTextContainer,
  createCourseTextHeader,
  createCourseRowLink,
  createCourseTextBody,
} from './coursedisplay.js';

const mainAnchor = document.querySelector<HTMLDivElement>('.cards-container')!;


export const createCourseDisplay = (courses: Courses[]) => {
  courses.forEach((course) => {
    const courseRow = createCourseRow();
    const courseLink = createCourseRowLink(course);
    const courseDiv = createCourseContentContainer();
    const courseImg = createCourseImg(course);
    const courseTextContainer = createCourseTextContainer();
    const courseTextHeader = createCourseTextHeader(course);
    const bodyTextContainer = createCourseTextBody(course);
    courseTextContainer.appendChild(courseTextHeader);
    courseTextContainer.appendChild(bodyTextContainer);
    courseDiv.appendChild(courseTextContainer);
    courseDiv.appendChild(courseImg);
    courseLink.appendChild(courseDiv);
    courseRow.appendChild(courseLink);
    mainAnchor.appendChild(courseRow);
  });
};

// Aktuella kurser

const createContentHeading = (heading: string): void => {
  const contentHeading = document.createElement('h2');
  contentHeading.appendChild(document.createTextNode(heading));
  mainAnchor.appendChild(contentHeading);
};

const highlightButton = (query: string): void => {
  const buttons = Array.from(document.querySelectorAll('.button-list a'));

  buttons.forEach((button) => {
    if (button.id === query) {
      const childElement = button.querySelector('li');
      if (childElement) {
        childElement.style.backgroundColor = 'rgb(188, 255, 252)';
      }
    }
  });
};

export const createSortedDisplay = (courses: [Courses], heading: string): void => {
  createContentHeading(heading as string) as void;
  highlightButton(query.currentQuery as string) as void;
  createCourseDisplay(courses as [Courses]) as void;
};

//Course Details

export const createCourseDetails = (course: Courses): void => {
  const backdropContainer = document.querySelector<HTMLElement>('main')!;
  const createBackground = document.createElement('div');
  createBackground.classList.add('backdrop');
  createBackground.style.backgroundImage = `url(${course.image})`;
  const createDiv = document.createElement('div');
  createDiv.innerText = `Kurstitel: ${course.title}\n
  Kursnummer: ${course.number}\n
  Beskrivning: ${course.description}\n
  Pris: ${course.price} kr\n
  Utbildning på distans? ${course.remote}\n
  Omdöme: ${course.review}\n
  Startdatum: ${course.start}\n
  Lärare: ${course.teacher}\n`;
  const createImage = document.createElement('img');
  createImage.setAttribute('src', course.image);
  backdropContainer.appendChild(createBackground);
  mainAnchor.appendChild(createDiv);

  const remote = document.querySelector<HTMLLIElement>('#remote li')!;
  const classroom = document.querySelector<HTMLLIElement>('#classroom li')!;
  const remoteParent = document.querySelector<HTMLLinkElement>('#remote')!;
  const classroomParent = document.querySelector<HTMLLinkElement>('#classroom')!;

  remoteParent.setAttribute(
    'href',
    `../html/enroll.html?id=${course.id}`
  );
  classroomParent.setAttribute(
    'href',
    `../html/enroll.html?id=${course.id}`
  );

  if (course.remote === true && 'true') {
    remote.style.backgroundColor = 'rgb(246, 250, 211)';
    remote.addEventListener('mouseover', function () {
      remote.style.backgroundColor = 'rgb(188, 255, 252)';
    });
    remote.addEventListener('mouseout', function () {
      remote.style.backgroundColor = 'rgb(246, 250, 211)';
    });
    classroomParent.style.pointerEvents = 'none';
  } else {
    classroom.style.backgroundColor = 'rgb(246, 250, 211)';
    classroom.addEventListener('mouseover', function () {
      classroom.style.backgroundColor = 'rgb(188, 255, 252)';
    });
    classroom.addEventListener('mouseout', function () {
      classroom.style.backgroundColor = 'rgb(246, 250, 211)';
    });
    remoteParent.style.pointerEvents = 'none';
  }
};

//Admin extra info

export const extraInfo = (course: Courses) => {
  const student_names = course.students.toString();
  document.querySelector<HTMLDivElement>('#number')!.textContent = course.number;
  document.querySelector<HTMLDivElement>('#student_names')!.textContent = student_names;
  document.querySelector<HTMLDivElement>('#student_count')!.textContent = course.students.length.toString();
  document.querySelector<HTMLDivElement>('#review')!.textContent = course.review.toString();
};

//Anmälan

export const dropdown = (courses: [Courses]) => {
  const anchor = document.querySelector<HTMLSelectElement>('#list-title')!;
  courses.forEach((course: Courses) => {
    const option = document.createElement('option')!;
    option.setAttribute('value', course.id.toString());
    option.setAttribute('name', course.id.toString());
    const optionText = document.createTextNode(course.title);
    option.appendChild(optionText);
    anchor.appendChild(option);
  });
  const queryNumber = parseInt(query.currentQuery)

  if (queryNumber > 0) {
    const optionValue = query.currentQuery;
    const option = anchor.querySelector(`option[value="${optionValue}"]`) as HTMLOptionElement;
    if (option){
      option.selected = true;
    }
    
  }
};

//Login

const regContainer = document.querySelector<HTMLDivElement>('.reg-container')!;
const loginContainer = document.querySelector<HTMLDivElement>('.login-container')!;
const loggedContainer = document.querySelector<HTMLDivElement>('.logged-in')!;
const notLoggedContainer = document.querySelector<HTMLDivElement>('.not-logged')!;
const userDisplay = document.querySelector<HTMLDivElement>('.user')!;

export const userBtns = () => {

  highlightButton(query.currentQuery);
  if (query.currentQuery === 'regNewUser') {
    regContainer.style.display = 'block';
    loggedContainer.style.display = 'none';
  } else {
    loginContainer.style.display = 'block';
    userDisplay.style.display = 'none';
    loggedContainer.style.display = 'none';
  }
};

export const loggedIn = () => {
  if (!localStorage.getItem('username')) {
    loggedContainer.style.display = 'none';
  } else {
    loggedContainer.style.display = 'block';
    notLoggedContainer.style.display = 'none';
    document.querySelector<HTMLLIElement>(
      '#logout'
    )!.textContent = `Logga ut ${localStorage.getItem('username')}`;
  }
};

// Students info

export const studentInfo = (student: Students) => {
  document.querySelector<HTMLSpanElement>(
    '#fullname'
  )!.textContent = `${student.firstname} ${student.lastname}`;
  document.querySelector<HTMLSpanElement>('#address')!.textContent = student.adress;
  document.querySelector<HTMLSpanElement>('#email')!.textContent = student.email;
  document.querySelector<HTMLSpanElement>('#mobil')!.textContent = student.phone;
};
