import { state, query } from '../utilities/config.js';

const createContentHeading = (heading) => {
  const contentHeading = document.createElement('h2');
  contentHeading.appendChild(document.createTextNode(heading));
  document.querySelector('.cards-container').appendChild(contentHeading);
};

const highlightButton = (query) => {
  const buttons = Array.from(document.querySelectorAll('.button-list a'));

  buttons.forEach((button) => {
    if (button.id === query) {
      button.style.color = 'red';
    }
  });
};

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

const createCourseDisplay = (course) => {
  const courseRow = createCourseRow();
  const courseLink = createCourseRowLink(course); //STATE DEP.
  const courseDiv = createCourseContentContainer();
  const courseImg = createCourseImg(course);
  const courseTextContainer = createCourseTextContainer();
  const courseTextHeader = createCourseTextHeader(course);
  const bodyTextContainer = createCourseTextBody(course); //STATE DEP.
  courseTextContainer.appendChild(courseTextHeader);
  courseTextContainer.appendChild(bodyTextContainer);
  courseDiv.appendChild(courseTextContainer);
  courseDiv.appendChild(courseImg);
  courseLink.appendChild(courseDiv);
  courseRow.appendChild(courseLink);
  return courseRow;
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
    case '/html/allakurser.html':
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
  textBody.appendChild(document.createTextNode(course.review.toPrecision(2)));
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

//Course Details

const createCourseDetails = (course) => {
  const anchor = document.querySelector('.cards-container');
  const backdropContainer = document.querySelector('main');
  const createBackground = document.createElement('div');
  createBackground.classList.add('backdrop');
  createBackground.style.backgroundImage = `url(${course.image})`;
  backdropContainer.appendChild(createBackground);

  // const createImage = document.createElement('img');
  // createImage.setAttribute('src', course.image);

  Object.entries(course).forEach(([key, value]) => {
    const createDiv = document.createElement('div');
    const spanKey = document.createElement('span');
    spanKey.classList.add('spanKey');
    const spanValue = document.createElement('span');
    spanValue.classList.add('spanValue');
    if (key !== 'image' && key !== 'id' && key !== 'number') {
      spanKey.innerText = `${key} `;
      spanValue.innerText = value;
    }

    createDiv.appendChild(spanKey);
    createDiv.appendChild(spanValue);
    anchor.appendChild(createDiv);
  });
};

export {
  createContentHeading,
  highlightButton,
  createCourseDisplay,
  createCourseDetails,
};
