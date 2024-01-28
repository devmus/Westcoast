import { query, state } from '../utilities/config.js';
export const createCourseRow = () => {
    const courseRow = document.createElement('section');
    courseRow.classList.add('course-row');
    return courseRow;
};
export const createCourseContentContainer = () => {
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course-div');
    return courseDiv;
};
export const createCourseImg = (course) => {
    const courseImg = document.createElement('img');
    courseImg.setAttribute('src', `${course.image}`);
    const altText = course.title || 'Okänd kurs, bild saknas';
    courseImg.setAttribute('alt', altText);
    return courseImg;
};
export const createCourseTextContainer = () => {
    const courseTextContainer = document.createElement('div');
    courseTextContainer.classList.add('course-text-container');
    return courseTextContainer;
};
export const createCourseTextHeader = (course) => {
    const courseTextHeader = document.createElement('h5');
    courseTextHeader.classList.add('kurstitel');
    courseTextHeader.appendChild(document.createTextNode(course.title));
    return courseTextHeader;
};
//
export const createCourseRowLink = (course) => {
    if (state.currentPage === '/src/html/admin.html') {
        return createLinkAdmin(course);
    }
    else {
        return createLinkDetails(course);
    }
};
const createLinkAdmin = (course) => {
    const courseLink = document.createElement('a');
    courseLink.classList.add('course-link');
    courseLink.href = `/src/html/admin-edit.html?id=${course.id}`;
    return courseLink;
};
const createLinkDetails = (course) => {
    const courseLink = document.createElement('a');
    courseLink.classList.add('course-link');
    courseLink.href = `/src/html/coursedetails.html?id=${course.id}`;
    return courseLink;
};
//
export const createCourseTextBody = (course) => {
    switch (state.currentPage) {
        case '/src/html/aktuella.html':
            if (query.currentQuery === 'omtycktakurser') {
                return listBestCourses(course);
            }
            else if (query.currentQuery === 'kursstart') {
                return listStartCourses(course);
            }
            else {
                return listPopularCourses(course);
            }
            break;
        case '/src/html/allcourses.html':
        case '/src/html/minasidor.html':
            return listAllCourses(course);
            break;
        case '/src/html/admin.html':
            return listAllCoursesAdmin(course);
            break;
        default:
            return listAllCourses(course);
    }
};
const listBestCourses = (course) => {
    const category = 'best';
    const bodyTextContainer = document.createElement('div');
    bodyTextContainer.classList.add('kurs-body-text-container', `kurs-body-text-${category}`);
    const secondText = document.createElement('smalltext');
    secondText.classList.add(`kurs-text`);
    secondText.appendChild(document.createTextNode('Review score'));
    bodyTextContainer.appendChild(secondText);
    const firstText = document.createElement('smalltext');
    firstText.classList.add(`kurs-text-${category}`);
    firstText.appendChild(document.createTextNode(course.review.toPrecision(2)));
    bodyTextContainer.appendChild(firstText);
    return bodyTextContainer;
};
const listStartCourses = (course) => {
    const textBody = document.createElement('smalltext');
    textBody.classList.add('kurs-text');
    textBody.appendChild(document.createTextNode(`Kursen start om ${course.daysDifference} dagar!`));
    return textBody;
};
const listPopularCourses = (course) => {
    const category = 'pop';
    const bodyTextContainer = document.createElement('div');
    bodyTextContainer.classList.add('kurs-body-text-container', `kurs-body-text-${category}`);
    const firstText = document.createElement('smalltext');
    firstText.classList.add(`kurs-text-${category}`);
    firstText.appendChild(document.createTextNode(`${course.students.length} students have already applied to this course!`));
    bodyTextContainer.appendChild(firstText);
    return bodyTextContainer;
};
const listAllCourses = (course) => {
    const category = 'all';
    const bodyTextContainer = document.createElement('div');
    bodyTextContainer.classList.add('kurs-body-text-container', `kurs-body-text-${category}`);
    const secondText = document.createElement('smalltext');
    secondText.classList.add(`kurs-text-${category}`);
    secondText.appendChild(document.createTextNode(`${course.description}`));
    bodyTextContainer.appendChild(secondText);
    const firstText = document.createElement('div');
    firstText.classList.add(`kurs-text-${category}`);
    firstText.innerHTML = `Teacher: ${course.teacher}<br>Review score: ${course.review}<br>Length: ${course.days} `;
    bodyTextContainer.appendChild(firstText);
    return bodyTextContainer;
};
const listAllCoursesAdmin = (course) => {
    const category = 'all';
    const bodyTextContainer = document.createElement('div');
    bodyTextContainer.classList.add('kurs-body-text-container', `kurs-body-text-${category}`);
    const secondText = document.createElement('smalltext');
    secondText.classList.add(`kurs-text-${category}`);
    secondText.appendChild(document.createTextNode(`Course Number: ${course.number}`));
    bodyTextContainer.appendChild(secondText);
    const firstText = document.createElement('div');
    firstText.classList.add(`kurs-text-${category}`);
    firstText.innerHTML = `Teacher: ${course.teacher}<br>Start date: ${course.start}<br>Students: ${course.students} `;
    bodyTextContainer.appendChild(firstText);
    return bodyTextContainer;
};
//
