import { state, query } from '../utilities/config.js';

// List courses

const createCourseRow = () => {
  const courseRow = document.createElement('section');
  courseRow.classList.add('course-row');

  return courseRow;
};

const createCourseContentContainer = () => {
  const courseDiv = document.createElement('div');
  courseDiv.classList.add('course-div');

  return courseDiv;
};

const createCourseImg = (course) => {
  const courseImg = document.createElement('img');
  courseImg.setAttribute('src', `${course.image}`);
  const altText = course.title || 'Okänd kurs, bild saknas';
  courseImg.setAttribute('alt', altText);
  return courseImg;
};

const createCourseTextContainer = () => {
  const courseTextContainer = document.createElement('div');
  courseTextContainer.classList.add('course-text-container');

  return courseTextContainer;
};

const createCourseTextHeader = (course) => {
  const courseTextHeader = document.createElement('h5');
  courseTextHeader.classList.add('kurstitel');
  courseTextHeader.appendChild(document.createTextNode(course.title));

  return courseTextHeader;
};

const createCourseRowLink = (course) => {
  if (state.currentPage === '/html/admin.html') {
    return createLinkAdmin(course);
  } else {
    return createLinkDetails(course);
  }
};

const createLinkAdmin = (course) => {
  const courseLink = document.createElement('a');
  courseLink.classList.add('course-link');
  courseLink.href = `../html/admin-edit.html?id=${course.id}`;

  return courseLink;
};

const createLinkDetails = (course) => {
  const courseLink = document.createElement('a');
  courseLink.classList.add('course-link');
  courseLink.href = `../html/coursedetails.html?id=${course.id}`;

  return courseLink;
};

const createCourseTextBody = (course) => {
  switch (state.currentPage) {
    case '/html/aktuella.html':
      if (query.currentQuery === 'omtycktakurser') {
        return listBestCourses(course);
      } else if (query.currentQuery === 'kursstart') {
        return listStartCourses(course);
      } else {
        return listPopularCourses(course);
      }
      break;
    case '/html/allcourses.html':
    case '/html/minasidor.html':
      return listAllCourses(course);
      break;
    case '/html/admin.html':
      return listAllCoursesAdmin(course);
      break;
  }
};

const listBestCourses = (course) => {
  const category = 'best';
  const bodyTextContainer = document.createElement('div');
  bodyTextContainer.classList.add(
    'kurs-body-text-container',
    `kurs-body-text-${category}`
  );
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
  textBody.appendChild(
    document.createTextNode(`Kursen start om ${course.daysDifference} dagar!`)
  );
  return textBody;
};

const listPopularCourses = (course) => {
  const category = 'pop';
  const bodyTextContainer = document.createElement('div');
  bodyTextContainer.classList.add(
    'kurs-body-text-container',
    `kurs-body-text-${category}`
  );
  const firstText = document.createElement('smalltext');
  firstText.classList.add(`kurs-text-${category}`);
  firstText.appendChild(
    document.createTextNode(
      `${course.students.length} students have already applied to this course!`
    )
  );
  bodyTextContainer.appendChild(firstText);
  return bodyTextContainer;
};

const listAllCourses = (course) => {
  const category = 'all';
  const bodyTextContainer = document.createElement('div');
  bodyTextContainer.classList.add(
    'kurs-body-text-container',
    `kurs-body-text-${category}`
  );
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
  bodyTextContainer.classList.add(
    'kurs-body-text-container',
    `kurs-body-text-${category}`
  );
  const secondText = document.createElement('smalltext');
  secondText.classList.add(`kurs-text-${category}`);
  secondText.appendChild(
    document.createTextNode(`Course Number: ${course.number}`)
  );

  bodyTextContainer.appendChild(secondText);

  const firstText = document.createElement('div');
  firstText.classList.add(`kurs-text-${category}`);

  firstText.innerHTML = `Teacher: ${course.teacher}<br>Start date: ${course.start}<br>Students: ${course.students} `;

  bodyTextContainer.appendChild(firstText);

  return bodyTextContainer;
};

export const createCourseDisplay = (courses) => {
  courses.forEach((course) => {
    const courseRow = createCourseRow();
    const courseLink = createCourseRowLink(course); //STATE DEP.
    const courseDiv = createCourseContentContainer();
    const courseImg = createCourseImg(course); //STATE DEP.
    const courseTextContainer = createCourseTextContainer();
    const courseTextHeader = createCourseTextHeader(course);
    const bodyTextContainer = createCourseTextBody(course); //STATE DEP.
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
};

//Login

export const userBtns = () => {
  highlightButton(query.currentQuery);
  if (query.currentQuery === 'regNewUser') {
    document.querySelector('.reg-container').style.display = 'block';
    document.querySelector('.logged-in').style.display = 'none';
  } else {
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('.user').style.display = 'none';
    document.querySelector('.logged-in').style.display = 'none';
  }
};

export const loggedIn = () => {
  if (!localStorage.getItem('username')) {
    document.querySelector('.logged-in').style.display = 'none';
  } else {
    document.querySelector('.logged-in').style.display = 'block';
    document.querySelector('.not-logged').style.display = 'none';
    document.querySelector(
      '#logout'
    ).textContent = `Logga ut ${localStorage.getItem('username')}`;
  }
};

// Students info

export const studentInfo = (student) => {
  document.querySelector(
    '#fullname'
  ).textContent = `${student.firstname} ${student.lastname}`;
  document.querySelector('#address').textContent = student.adress;
  document.querySelector('#email').textContent = student.email;
  document.querySelector('#mobil').textContent = student.phone;
};
