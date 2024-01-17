const createCourseDisplay = (kurs) => {
  const courseRow = document.createElement('section');
  courseRow.classList.add('course-row');

  const courseLink = document.createElement('a');
  courseLink.classList.add('course-link');
  courseLink.href = `../html/admin-edit.html?id=${kurs.id}`;

  const courseDiv = document.createElement('div');
  courseDiv.classList.add('course-div');

  const courseImg = document.createElement('img');
  courseImg.src = kurs.bild;
  courseImg.setAttribute('alt', kurs.kurstitel);

  const courseTextContainer = document.createElement('div');
  courseTextContainer.classList.add('course-text-container');

  const textHeader = document.createElement('h5');
  textHeader.classList.add('kurstitel');
  textHeader.appendChild(document.createTextNode(kurs.kurstitel));

  courseTextContainer.appendChild(textHeader);
  courseDiv.appendChild(courseImg);
  courseDiv.appendChild(courseTextContainer);
  courseLink.appendChild(courseDiv);
  courseRow.appendChild(courseLink);

  return courseRow;
};

export { createCourseDisplay };
