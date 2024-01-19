const createCourseDisplay = (course) => {
  const courseRow = document.createElement('section');
  courseRow.classList.add('course-row');

  const courseLink = document.createElement('a');
  courseLink.classList.add('course-link');
  courseLink.href = `../html/admin-edit.html?id=${course.id}`;

  const courseDiv = document.createElement('div');
  courseDiv.classList.add('course-div');

  const courseImg = document.createElement('img');
  courseImg.setAttribute('src', `${course.image}${course.id}.jpg`);
  courseImg.setAttribute('alt', course.title);

  const courseTextContainer = document.createElement('div');
  courseTextContainer.classList.add('course-text-container');

  const textHeader = document.createElement('h5');
  textHeader.classList.add('kurstitel');
  textHeader.appendChild(document.createTextNode(course.title));

  const bodyTextContainer = document.createElement('div');
  bodyTextContainer.classList.add('kurs-body-text-container');

  const textBody = document.createElement('smalltext');
  textBody.classList.add('kurs-text');
  textBody.appendChild(document.createTextNode(course.review.toPrecision(2)));

  bodyTextContainer.appendChild(textBody);
  courseTextContainer.appendChild(textHeader);
  courseTextContainer.appendChild(bodyTextContainer);
  courseDiv.appendChild(courseTextContainer);
  courseDiv.appendChild(courseImg);
  courseLink.appendChild(courseDiv);
  courseRow.appendChild(courseLink);

  return courseRow;
};

const createContentHeading = (heading) => {
  const contentHeading = document.createElement('h2');
  contentHeading.appendChild(document.createTextNode(heading));
  document.querySelector('.cards-container').appendChild(contentHeading);
};

const highlightButton = (query) => {
  const buttons = Array.from(document.querySelectorAll('.button-list a'));
  console.log(buttons);
  console.log(query);

  buttons.forEach((button) => {
    if (button.id === query) {
      button.style.color = 'red';
    }
  });
};

export { createCourseDisplay, createContentHeading, highlightButton };
