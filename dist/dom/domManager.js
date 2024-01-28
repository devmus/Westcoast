import { query } from '../utilities/config.js';
import { createCourseRow, createCourseContentContainer, createCourseImg, createCourseTextContainer, createCourseTextHeader, createCourseRowLink, createCourseTextBody, } from './coursedisplay.js';
const mainAnchor = document.querySelector('.cards-container');
export const createCourseDisplay = (courses) => {
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
const createContentHeading = (heading) => {
    const contentHeading = document.createElement('h2');
    contentHeading.appendChild(document.createTextNode(heading));
    mainAnchor.appendChild(contentHeading);
};
const highlightButton = (query) => {
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
export const createSortedDisplay = (courses, heading) => {
    createContentHeading(heading);
    highlightButton(query.currentQuery);
    createCourseDisplay(courses);
};
//Course Details
export const createCourseDetails = (course) => {
    const backdropContainer = document.querySelector('main');
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
    const remote = document.querySelector('#remote li');
    const classroom = document.querySelector('#classroom li');
    const remoteParent = document.querySelector('#remote');
    const classroomParent = document.querySelector('#classroom');
    remoteParent.setAttribute('href', `../html/enroll.html?id=${course.id}`);
    classroomParent.setAttribute('href', `../html/enroll.html?id=${course.id}`);
    if (course.remote === true && 'true') {
        remote.style.backgroundColor = 'rgb(246, 250, 211)';
        remote.addEventListener('mouseover', function () {
            remote.style.backgroundColor = 'rgb(188, 255, 252)';
        });
        remote.addEventListener('mouseout', function () {
            remote.style.backgroundColor = 'rgb(246, 250, 211)';
        });
        classroomParent.style.pointerEvents = 'none';
    }
    else {
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
export const extraInfo = (course) => {
    const student_names = course.students.toString();
    document.querySelector('#number').textContent = course.number;
    document.querySelector('#student_names').textContent = student_names;
    document.querySelector('#student_count').textContent = course.students.length.toString();
    document.querySelector('#review').textContent = course.review.toString();
};
//Anmälan
export const dropdown = (courses) => {
    const anchor = document.querySelector('#list-title');
    courses.forEach((course) => {
        const option = document.createElement('option');
        option.setAttribute('value', course.id.toString());
        option.setAttribute('name', course.id.toString());
        const optionText = document.createTextNode(course.title);
        option.appendChild(optionText);
        anchor.appendChild(option);
    });
    const queryNumber = parseInt(query.currentQuery);
    if (queryNumber > 0) {
        const optionValue = query.currentQuery;
        const option = anchor.querySelector(`option[value="${optionValue}"]`);
        if (option) {
            option.selected = true;
        }
    }
};
//Login
const regContainer = document.querySelector('.reg-container');
const loginContainer = document.querySelector('.login-container');
const loggedContainer = document.querySelector('.logged-in');
const notLoggedContainer = document.querySelector('.not-logged');
const userDisplay = document.querySelector('.user');
export const userBtns = () => {
    highlightButton(query.currentQuery);
    if (query.currentQuery === 'regNewUser') {
        regContainer.style.display = 'block';
        loggedContainer.style.display = 'none';
    }
    else {
        loginContainer.style.display = 'block';
        userDisplay.style.display = 'none';
        loggedContainer.style.display = 'none';
    }
};
export const loggedIn = () => {
    if (!localStorage.getItem('username')) {
        loggedContainer.style.display = 'none';
    }
    else {
        loggedContainer.style.display = 'block';
        notLoggedContainer.style.display = 'none';
        document.querySelector('#logout').textContent = `Logga ut ${localStorage.getItem('username')}`;
    }
};
// Students info
export const studentInfo = (student) => {
    document.querySelector('#fullname').textContent = `${student.firstname} ${student.lastname}`;
    document.querySelector('#address').textContent = student.adress;
    document.querySelector('#email').textContent = student.email;
    document.querySelector('#mobil').textContent = student.phone;
};
