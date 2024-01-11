// let promise = new Promise((resolve, reject) => {
//   reject('Gick inge vidare!');
//   resolve('Är klar');
// });

// promise
//   //Inled Loading...
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error))
//   .finally(console.log('Färdig')); //Avsluta "loading"

// const value = 0;

// let promise = new Promise((resolved, reject) => {
//   if (value === 0) {
//     resolved('OK');
//   } else {
//     reject('Not OK');
//   }
// });

// promise
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error))
//   .finally(console.log('Klar'));

// function loadData(url) {
//   let promise = new Promise((resolve, reject) => {
//     if (url === 'http://mysite.com') {
//       resolve('Allt är okidoki');
//     } else {
//       reject('INTE OK');
//     }
//   });

//   return promise;
// }

// const response = loadData('http://mysite.se');

// response
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error))
//   .finally(console.log('OK'));
