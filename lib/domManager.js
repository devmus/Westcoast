const createCourseDisplay = (kurs) => {
  const courseRow = document.createElement('section');
  courseRow.classList.add('course-row');

  const courseLink = document.createElement('a');
  courseLink.classList.add('course-link');
  courseLink.href = `../html/admin-edit.html?id=${kurs.id}`;

  const courseDiv = document.createElement('div');
  courseDiv.classList.add('course-div');

  const courseImg = document.createElement('img');
  courseImg.setAttribute('src', `${kurs.bild}${kurs.id}.jpg`);
  courseImg.setAttribute('alt', kurs.kurstitel);

  const courseTextContainer = document.createElement('div');
  courseTextContainer.classList.add('course-text-container');

  const textHeader = document.createElement('h5');
  textHeader.classList.add('kurstitel');
  textHeader.appendChild(document.createTextNode(kurs.kurstitel));

  const bodyTextContainer = document.createElement('div');
  bodyTextContainer.classList.add('kurs-body-text-container');

  const textBody = document.createElement('smalltext');
  textBody.classList.add('kurs-text');
  textBody.appendChild(document.createTextNode(kurs.omdome.toPrecision(2)));

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

export { createCourseDisplay, createContentHeading };
