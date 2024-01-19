import Kurs from '../Models/Course.js';
import { HttpClient } from '../lib/https.js';

export default class AppManager {
  async rankCourses() {
    try {
      const http = new HttpClient();
      const result = await http.get('kurser');

      const kurser = result.map((kurs) => {
        return new Kurs(
          kurs.id,
          kurs.kurstitel,
          kurs.beskrivning,
          kurs.omdome,
          kurs.kursdagar,
          kurs.kursstart,
          kurs.kursnummer,
          kurs.distans,
          kurs.bild
        );
      });

      kurser.sort((a, b) => parseFloat(b.omdome) - parseFloat(a.omdome));

      let rankadeKurser = kurser.slice(0, 5);

      return rankadeKurser;
    } catch (error) {
      throw error;
    }
  }
}
