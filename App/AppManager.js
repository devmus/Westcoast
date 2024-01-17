import Kurs from '../Models/Course.js';
import { HttpClient } from '../lib/https.js';

export default class AppManager {
  async rankCourses() {
    try {
      const http = new HttpClient();
      const result = await http.get('kurser');

      console.log('Result', result);
      const kurser = result.map((kurs) => {
        return new Kurs(
          kurs.id,
          kurs.kurstitel,
          kurs.beskrivning,
          kurs.omdome,
          kurs.kursdagar,
          kurs.kursstart,
          kurs.distans,
          kurs.bild
        );
      });

      return kurser;
    } catch (error) {
      throw error;
    }
  }
}

console.log('AppManager imported');

// result.sort(
//   (a, b) => parseFloat(b.review_score) - parseFloat(a.review_score)
// );
// let bestCourses = courses.slice(0, 5);

// bestCourses.forEach((obj, index) => {
//   obj.id = index + 1;
// });
