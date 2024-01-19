// const createCard = (
//   id,
//   kurstitel,
//   beskrivning,
//   kursdagar,
//   utbildare,
//   omdome
// ) => {
//   const title = document.title;
//   const cardsContainer = document.querySelector('.cards-container');

//   createLink.appendChild(createDiv);
//   const cardContent = document.createElement('span');
//   createDiv.appendChild(cardContent);
//   if (title === 'Westcoast Education - Toppkurser') {
//     createSection.classList.add('course-card', 'card-best');
//     cardContent.innerText = `Kurs: ${kurstitel}\n Lärare: ${utbildare}\n Omdöme: ${omdome}`;
//   } else if (title === 'Westcoast Education - Alla kurser') {
//     createSection.classList.add('course-card', 'card-all');
//     cardContent.innerText = `Kurs: ${kurstitel}\n Lärare: ${utbildare}\n Längd: ${kursdagar}`;
//   } else if (title === 'Westcoast Education - Administration') {
//     createSection.classList.add('course-card', 'card-admin');
//     cardContent.innerText = `id: ${id}\n Kurs: ${kurstitel} - ${beskrivning}\n Lärare: ${utbildare}\n Längd: ${kursdagar}`;
//     createDiv.setAttribute('kursid', `${id}`);
//     createLink.setAttribute('href', `../html/admin-edit.html?id=${id}`);
//   }
// };

// export { createCard };

// console.log('createCard exported');
