import { query } from '../utilities/config.js';
import { createCourseRow, createCourseContentContainer, createCourseImg, createCourseTextContainer, createCourseTextHeader, createCourseRowLink, createCourseTextBody, } from './coursedisplay.js';
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
        document.querySelector('.cards-container').appendChild(courseRow);
    });
};
// Aktuella kurser
const createContentHeading = (heading) => {
    const contentHeading = document.createElement('h2');
    contentHeading.appendChild(document.createTextNode(heading));
    document.querySelector('.cards-container').appendChild(contentHeading);
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
    const anchor = document.querySelector('.cards-container');
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
    anchor.appendChild(createDiv);
    const remote = document.querySelector('#remote li');
    const classroom = document.querySelector('#classroom li');
    remote.parentElement.setAttribute('href', `../html/enroll.html?id=${course.id}`);
    classroom.parentElement.setAttribute('href', `../html/enroll.html?id=${course.id}`);
    if (course.remote === true && 'true') {
        remote.style.backgroundColor = 'rgb(246, 250, 211)';
        remote.addEventListener('mouseover', function () {
            remote.style.backgroundColor = 'rgb(188, 255, 252)';
        });
        remote.addEventListener('mouseout', function () {
            remote.style.backgroundColor = 'rgb(246, 250, 211)';
        });
        classroom.parentElement.style.pointerEvents = 'none';
    }
    else {
        classroom.style.backgroundColor = 'rgb(246, 250, 211)';
        classroom.addEventListener('mouseover', function () {
            classroom.style.backgroundColor = 'rgb(188, 255, 252)';
        });
        classroom.addEventListener('mouseout', function () {
            classroom.style.backgroundColor = 'rgb(246, 250, 211)';
        });
        remote.parentElement.style.pointerEvents = 'none';
    }
};
//Admin extra info
export const extraInfo = (course) => {
    const student_names = course.students.toString();
    document.querySelector('#number').textContent = course.number;
    document.querySelector('#student_names').textContent = student_names;
    document.querySelector('#student_count').textContent = course.students.length;
    document.querySelector('#review').textContent = course.review;
};
//Anmälan
export const dropdown = (courses) => {
    const anchor = document.querySelector('#list-title');
    courses.forEach((course) => {
        const option = document.createElement('option');
        option.setAttribute('value', course.id);
        option.setAttribute('name', course.id);
        const optionText = document.createTextNode(course.title);
        option.appendChild(optionText);
        anchor.appendChild(option);
    });
    if (query.currentQuery > 0) {
        const optionValue = query.currentQuery;
        const option = anchor.querySelector(`option[value="${optionValue}"]`);
        option.selected = true;
    }
};
//Login
export const userBtns = () => {
    highlightButton(query.currentQuery);
    if (query.currentQuery === 'regNewUser') {
        document.querySelector('.reg-container').style.display = 'block';
        document.querySelector('.logged-in').style.display = 'none';
    }
    else {
        document.querySelector('.login-container').style.display = 'block';
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.logged-in').style.display = 'none';
    }
};
export const loggedIn = () => {
    if (!localStorage.getItem('username')) {
        document.querySelector('.logged-in').style.display = 'none';
    }
    else {
        document.querySelector('.logged-in').style.display = 'block';
        document.querySelector('.not-logged').style.display = 'none';
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
